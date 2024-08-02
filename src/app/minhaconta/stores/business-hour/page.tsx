"use client";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Divider from "@component/Divider";
import { H3 } from "@component/Typography";
import { Button } from "@component/buttons";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import BusinessHours from "@supabaseutils/model/BusinessHours";


const initialBusinessHours: BusinessHours = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

const BusinessHoursPage = () => {
  const [businessHours, setBusinessHours] =
    useState<BusinessHours>(initialBusinessHours);

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
    console.log(businessHours);
    // Aqui você pode enviar o payload para o servidor
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
    <>
      <DashboardPageHeader
        title="Horário de Funcionamento"
        iconName="clock-circular-outline"
      />
      <Divider width="100%" backgroundColor="gray.400" mt="0.35rem" />
      <Box p={5}>
        {Object.keys(businessHours).map((day) => (
          <Box key={day} mb={5}>
            <H3 size="md">{getWeekeDay(day)}</H3>
            <Divider width="100%" bg="gray.400" mb="2rem" />
            <VStack spacing={3} align="start">
              {businessHours[day].map((slot, index) => (
                <HStack key={index} spacing={3}>
                  <FormControl id={`${day}-open-${index}`}>
                    <FormLabel>Abre às</FormLabel>
                    <Input
                      type="time"
                      value={slot.open}
                      onChange={(e) =>
                        handleTimeSlotChange(day, index, "open", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl id={`${day}-close-${index}`}>
                    <FormLabel>Flecha às</FormLabel>
                    <Input
                      type="time"
                      value={slot.close}
                      onChange={(e) =>
                        handleTimeSlotChange(
                          day,
                          index,
                          "close",
                          e.target.value
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
        <FlexBox justifyContent="center" pb="4rem" pt="2.5rem">
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            <Icon mr="1rem">fa/solid/floppy-disk</Icon> Salvar Alterações
          </Button>
        </FlexBox>
      </Box>
    </>
  );
};

export default BusinessHoursPage;
