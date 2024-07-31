import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import StockStep from "./FormProductStock";
import { Accordion, AccordionHeader } from "@component/accordion";
import Typography, { SemiSpan } from "@component/Typography";
import { Checkbox, CheckboxGroup, Stack, Switch, Text } from "@chakra-ui/react";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";

const FormProductDisponibility = ({
  values,
  setFieldValue,
}: {
  values: any;
  setFieldValue: any;
}) => {
  return (
    <Grid container splited spacing={6}>
      <Grid item xs={12}>
        <Divider width="100%" mb="1rem" />
        <StockStep values={values} setFieldValue={setFieldValue} />
      </Grid>
      <Grid item xs={12}>
        <Divider width="100%" backgroundColor="#d5d5d7" />
        <Accordion expanded>
          <AccordionHeader px="0px" py="6px" color="text.muted">
            <SemiSpan className="cursor-pointer" mr="9px">
              Disponibilidade
            </SemiSpan>
          </AccordionHeader>

          <Grid item xs={12}>
            <Stack align="center" direction="row">
              <Typography mb={18} fontSize="0.75rem">
                Ao configurar a disponibilidade para o produto, o mesmo será
                apresentada de acordo com os dias abaixo e com base nos{" "}
                <b>horarios de funcionamento do estabelecimento</b>.
              </Typography>
            </Stack>
            <Stack align="center" direction="row">
              <Switch
                name="status"
                size="md"
                isChecked={values.status == StatusEntity.ACTIVE}
                value={values.status}
                onChange={(event) =>
                  setFieldValue(
                    "status",
                    event.target.checked
                      ? StatusEntity.ACTIVE
                      : StatusEntity.INATIVE
                  )
                }
              />

              {values.status == StatusEntity.ACTIVE && (
                <Text color="teal" fontWeight="bold">
                  ATIVO
                </Text>
              )}
              {values.status == StatusEntity.INATIVE && (
                <Text color="tomato" fontWeight="bold">
                  PAUSADO
                </Text>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography mb={18} marginTop="1rem" fontWeight="bold">
              Dias em que o produto estará disponivel
            </Typography>
            <CheckboxGroup
              colorScheme="green"
              onChange={(event) => setFieldValue("disponibility", event)}
              defaultValue={values.disponibility}
            >
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox value="dom">dom</Checkbox>
                <Checkbox value="seg">seg</Checkbox>
                <Checkbox value="ter">ter</Checkbox>
                <Checkbox value="qua">qua</Checkbox>
                <Checkbox value="qui">qui</Checkbox>
                <Checkbox value="sex">sex</Checkbox>
                <Checkbox value="sab">sab</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Grid>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default FormProductDisponibility;
