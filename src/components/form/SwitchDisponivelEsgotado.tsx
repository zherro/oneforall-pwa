import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import Typography from "../Typography";
import { Stack, Switch, Text } from "@chakra-ui/react";

interface Props {
  label?: string;
  id: string;
  values: any;
  setFieldValue: any;
}

const SwitchDisponivelEsgotado = ({ label, id, values, setFieldValue }: Props) => {
  return (
    <>
      {label && <Typography pb="0.5rem">{label}</Typography>}
      <Stack align="center" direction="row">
        <Switch
          disabled
          id={id}
          name={id}
          size="md"
          isChecked={values[id] == StatusEntity.PUBLISHED}
          onChange={(event) => setFieldValue(id, event.target.checked)}
        />
        {values[id] == StatusEntity.PUBLISHED && (
          <Text color="teal" fontWeight="bold">
            DISPONIVEL
          </Text>
        )}
        {values[id] == StatusEntity.PUBLISHED && (
          <Text color="tomato" fontWeight="bold">
            ESGOTADO
          </Text>
        )}
      </Stack>
    </>
  );
};

export default SwitchDisponivelEsgotado;
