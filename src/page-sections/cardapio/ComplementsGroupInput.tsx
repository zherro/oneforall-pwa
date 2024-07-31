import { Stack, Switch, Text } from "@chakra-ui/react";
import Divider from "@component/Divider";
import { SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import TextField from "@component/text-field";

interface ComplementsGroupInputProps {
  compName: any;
  setCompName: Function;
  setComplements: Function;
  complements: any[];
}

const ComplementsGroupInput = ({
  setCompName,
  compName,
  setComplements,
  complements,
}: ComplementsGroupInputProps) => {
  return (
    <Grid container splited spacing={12}>
      <Divider width="100%" marginTop="2rem" />
      <Grid item xs={12} md={6}>
        <TextField
          fontSize="0.75rem"
          fullwidth
          label="Novo grupo de complementos"
          labelWheight="bold"
          placeholder="Acompanhamentos"
          onChange={(e: any) =>
            setCompName({ ...compName, name: e.target.value })
          }
        />
        <SemiSpan>* o nome deve ter ao menos 5 caracteres</SemiSpan>
      </Grid>
      <Grid item xs={6} md={3}>
        <OpcionalObrigatorio compName={compName} setCompName={setCompName} />
      </Grid>
      <Grid item xs={6} md={3}>
        <Button
          mt="1.5rem"
          color="primary"
          disabled={(compName.name || "").length < 5}
          onClick={(e: any) => {
            e.preventDefault();
            if ((compName.name || "").length > 5) {
                compName.itens = []
                setComplements([...complements, compName]);
            }
          }}
        >
          <Icon size="1rem" color="primary">
            plus
          </Icon>
          Adicionar
        </Button>
      </Grid>
    </Grid>
  );
};

interface OpcionalObrigatorioProps {
  compName: any;
  setCompName: Function;
}

const OpcionalObrigatorio = ({
  compName,
  setCompName,
}: OpcionalObrigatorioProps) => {
  return (
    <Stack align="center" direction="row" mt="2rem">
      <Switch
        size="md"
        isChecked={compName.required}
        onChange={(e: any) =>
          setCompName({
            ...compName,
            required: e.target.checked,
          })
        }
      />

      {compName.required && (
        <Text color="teal" fontWeight="bold">
          Obrigatório
        </Text>
      )}
      {!compName.required && (
        <Text color="tomato" fontWeight="bold">
          Opcional
        </Text>
      )}
    </Stack>
  );
};

export default ComplementsGroupInput;
