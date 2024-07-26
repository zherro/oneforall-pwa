import { Stack, Switch, Text } from "@chakra-ui/react";
import Typography from "../Typography";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";

interface Props {
  label?: string;
  id: string;
  values: any;
  setFieldValue: any;
}

const SwitchStatusForm = ({ label, id, values, setFieldValue }: Props) => {
  return (
    <>
      {label && <Typography pb="0.5rem">{label}</Typography>}
      <Stack align="center" direction="row">
        <Switch
          id={id}
          name={id}
          size="md"
          isChecked={values[id] == StatusEntity.ACTIVE}
          onChange={(event) => setFieldValue(id, event.target.checked)}
        />

        {values[id] && (
          <Text color="teal" fontWeight="bold">
            ATIVO
          </Text>
        )}
        {!values[id] && (
          <Text color="tomato" fontWeight="bold">
            PAUSADO
          </Text>
        )}
      </Stack>
    </>
  );
};

export default SwitchStatusForm;
