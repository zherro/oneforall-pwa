import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import Typography from "../Typography";
import { Stack, Switch, Text } from "@chakra-ui/react";

interface Props {
  label?: string;
  id: string;
  values: any;
  setFieldValue: any;
}

const SwitchStatusPost = ({ label, id, values, setFieldValue }: Props) => {
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
            PUBLICADO
          </Text>
        )}
        {values[id] == StatusEntity.RACUNHO && (
          <Text color="tomato" fontWeight="bold">
            RASCUNHO
          </Text>
        )}
        {values[id] == StatusEntity.SUSPENSE && (
          <Text color="gray" fontWeight="bold">
            SUSPENSO
          </Text>
        )}
      </Stack>
    </>
  );
};

export default SwitchStatusPost;
