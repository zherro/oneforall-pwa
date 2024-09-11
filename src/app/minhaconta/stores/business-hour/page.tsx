"use client";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Divider from "@component/Divider";
import Typography, { H2, H3, H4, SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import BusinessHours from "@supabaseutils/model/BusinessHours";
import { fetchGet, fetchPost } from "@hook/useFetch2";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import { useRouter } from "next/navigation";
import useHandleError from "@hook/useHandleError";
import useNotify from "@hook/useNotify";
import Grid from "@component/grid/Grid";
import { useSession } from "@supabaseutils/supabase.provider";
import Box from "@component/Box";
import { mask } from "@lib/mask/lib/mask";
import StringUtils from "@utils/helpers/String.utils";
import Link from "next/link";

const initialBusinessHours: BusinessHours = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

const businessHoursSort = (value: BusinessHours): BusinessHours => ({
  monday: value.monday,
  tuesday: value.tuesday,
  wednesday: value.wednesday,
  thursday: value.thursday,
  friday: value.friday,
  saturday: value.saturday,
  sunday: value.sunday,
});

const validateAndCorrectTime = (input) => {
  // Regular expression to match HH:MM format
  const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;

  // Function to check if the input matches the time format
  function isValidTime(str) {
    return timeRegex.test(str);
  }

  // Loop to remove the last character until a valid time is found
  while (!isValidTime(input) && input.length >= 5) {
    input = input.slice(0, -1); // Remove the last character
  }

  return input;
};

const BusinessHoursPage = () => {
  const { tenant } = useSession();
  const router = useRouter();
  const notify = useNotify();

  const URI = API_ROUTES.STORE.UPDATE_BUSSINES_HOURS;

  const [businessHours, setBusinessHours] =
    useState<BusinessHours>(initialBusinessHours);
  const [loading, onLoading] = useState<boolean>(true);
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (!StringUtils.isEmpty(tenant?.id)) {
      fetchGet(URI + `/${tenant?.id}`, {
        handleData: (data) => {
          setBusinessHours(data?.monday ? data : initialBusinessHours);
        },
        handleError: useHandleError(notify),
        onLoading,
      });
    }
  }, [tenant]);

  const addTimeSlot = (day: string) => {
    setBusinessHours({
      ...businessHours,
      [day]: [...businessHours[day], { open: "", close: "" }],
    });
  };

  const removeTimeSlot = (day: string, index: number) => {
    const newTimeSlots = businessHours[day].filter((_, i) => i !== index);
    setBusinessHours({
      ...businessHours,
      [day]: newTimeSlots,
    });
  };

  const handleTimeSlotChange = (
    day: string,
    index: number,
    field: string,
    value: string
  ) => {
    const newTimeSlots = businessHours[day].map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setBusinessHours({
      ...businessHours,
      [day]: newTimeSlots,
    });
  };

  const handleSubmit = () => {
    // console.log(businessHours);
    fetchPost(URI + `/${tenant?.id}`, businessHours, {
      handleData: (data) => {
        setUpdated(true);
      },
      handleError: useHandleError(notify),
      onLoading,
    });
  };

  const getWeekeDay = (day: string) => {
    switch (day.toUpperCase()) {
      case "MONDAY":
        return "Segunda-feira";
      case "TUESDAY":
        return "Terça-feira";
      case "WEDNESDAY":
        return "Quarta-feira";
      case "THURSDAY":
        return "Quinta-feira";
      case "FRIDAY":
        return "Sexta-feira";
      case "SATURDAY":
        return "Sábado";
      case "SUNDAY":
        return "Domingo";
    }
  };

  return (
    (StringUtils.isEmpty(tenant?.id) && (
      <>
        <Grid container splited>
          <Grid item xs={12}>
            <DashboardPageHeader
              title="Horário de Funcionamento"
              iconName="clock-circular-outline"
            />
            <Divider
              width="100%"
              backgroundColor="gray.400"
              mt="0.35rem"
              mb="2rem"
            />
          </Grid>

          <Grid item xs={12}>
            <H2 mt="1.5rem" textAlign="center" color="gray.600">
              Oops!
            </H2>
            <FlexBox
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Typography
                mt="1rem"
                fontSize="1rem"
                textAlign="center"
                maxWidth="500px"
              >
                Selecione uma loja! Para configurar o horário de funcionamento,
                primeiro você precisa selecionar uma loja.
              </Typography>
              <Link href={APP_ROUTES.DASHBOARD.STORE.MY_STORE}>
                <Button
                  mt="2rem"
                  variant="contained"
                  width="160px"
                  color="primary"
                >
                  Gerenciar Loja
                </Button>
              </Link>
            </FlexBox>
          </Grid>
        </Grid>
      </>
    )) || (
      <>
        <Grid container splited>
          <Grid item xs={12}>
            <DashboardPageHeader
              title="Horário de Funcionamento"
              iconName="clock-circular-outline"
            />
            <Divider
              width="100%"
              backgroundColor="gray.400"
              mt="0.35rem"
              mb="2rem"
            />
            <Box
              border="1px solid"
              borderRadius="6px"
              p="0.75rem"
              shadow={6}
              borderColor="gray.400"
              mb="2rem"
            >
              <H4 mb="0.75rem" color="gray.700">
                Aqui você gerencia os horários de atendimento da sua loja!
              </H4>
              <SemiSpan>
                Aqui você gerência os horários de atendimento da sua loja. Caso
                a sua loja tenha pausas durante o dia, você pode configurar mais
                de um horário.
              </SemiSpan>
            </Box>
          </Grid>
        </Grid>
        <Grid container splited>
          <Grid item xs={12}>
            {Object.keys(businessHoursSort(businessHours)).map((day) => (
              <>
                <FlexBox mt="0.25rem">
                  <Box>{getWeekeDay(day)}:</Box>
                  <FlexBox flexDirection="column">
                    {businessHours[day].map((slot, index) => (
                      <FlexBox justifyContent="">
                        <Typography ml="1rem" fontWeight="bold">
                          {slot.open}
                        </Typography>
                        <Typography px="1rem">{" até "}</Typography>
                        <Typography fontWeight="bold">{slot.close}</Typography>
                      </FlexBox>
                    ))}
                  </FlexBox>
                </FlexBox>
              </>
            ))}
          </Grid>
        </Grid>
        <Divider mb="2.5rem" />
        <Grid container splited>
          <Grid item xs={12}>
            {Object.keys(businessHoursSort(businessHours)).map((day) => (
              <Box key={day} mb={5}>
                <H3 size="md" mt="1.5rem" fontWeight="600">
                  {getWeekeDay(day)}
                </H3>
                <Divider width="100%" bg="gray.400" mb="2rem" />
                <VStack spacing={3} align="start">
                  {businessHours[day].map((slot, index) => (
                    <HStack key={index} spacing={3}>
                      <FormControl id={`${day}-open-${index}`}>
                        <FormLabel>Abre às</FormLabel>
                        <Input
                          width="10rem"
                          type="text"
                          value={slot.open}
                          onChange={(e) =>
                            handleTimeSlotChange(
                              day,
                              index,
                              "open",
                              mask(
                                validateAndCorrectTime(e.target.value),
                                "99:99"
                              )
                            )
                          }
                        />
                      </FormControl>
                      <FormControl id={`${day}-close-${index}`}>
                        <FormLabel>Fecha às</FormLabel>
                        <Input
                          width="10rem"
                          type="text"
                          value={slot.close}
                          onChange={(e) =>
                            handleTimeSlotChange(
                              day,
                              index,
                              "close",
                              mask(
                                validateAndCorrectTime(e.target.value),
                                "99:99"
                              )
                            )
                          }
                        />
                      </FormControl>
                      <Button
                        mt="2rem"
                        ml="1rem"
                        onClick={() => removeTimeSlot(day, index)}
                        color="error"
                        variant="outlined"
                        width="38px"
                        height="38px"
                      >
                        <Icon>minus</Icon>
                      </Button>
                    </HStack>
                  ))}
                  <Button
                    onClick={() => addTimeSlot(day)}
                    variant="outlined"
                    color="primary"
                  >
                    <Icon>plus</Icon>
                  </Button>
                </VStack>
              </Box>
            ))}
            <FlexBox justifyContent="center" mb="1.5rem" pt="2.5rem">
              <Button
                disabled={loading}
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                <Icon mr="1rem">fa/solid/floppy-disk</Icon> Salvar Alterações
              </Button>
            </FlexBox>
            <FlexBox justifyContent="center" pb="4rem">
              {updated && (
                <Typography
                  fontSize="1.25rem"
                  fontWeight="600"
                  textAlign="center"
                  color="success.main"
                >
                  Horários atualizados com sucesso!
                </Typography>
              )}
            </FlexBox>
          </Grid>
        </Grid>
      </>
    )
  );
};

export default BusinessHoursPage;
