import {
  HStack,
  Input,
  Stack,
  Switch,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import Divider from "@component/Divider";
import { SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import TextField from "@component/text-field";
import { mask } from "@lib/mask/lib/mask";
import { useState } from "react";

interface ComplementsInputProps {
  comp: any;
  addComp: Function;
}

const ComplementsInput = ({
  comp, addComp
}: ComplementsInputProps) => {

  const [cmp, setCmp] = useState<{
    name?: string;
    price?: string;
  }>({
    name: '',
    price: ''
  });

  return (
    <Grid container splited spacing={12}>
      <Divider width="100%" marginTop="2rem" />
      <Grid item xs={12} md={6}>
        <TextField
          fontSize="0.75rem"
          fullwidth
          label="Novo complementos"
          placeholder="Acompanhamentos"
          onChange={(e: any) =>
            setCmp({ ...cmp, name: e.target.value })
          }
        />
        <SemiSpan>* o nome deve ter ao menos 3 caracteres</SemiSpan>
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          fullwidth
          label="Preço - R$"
          labelWheight="bold"
          placeholder=""
          value={cmp?.price}
          onChange={(e: any) =>
            setCmp({ ...cmp, price: mask(e.target.value, ["9.999", "99.999", "999.999", "9999.99"])})
          }
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <Button
          mt="1.5rem"
          color="primary"
          disabled={(cmp.name || "").length < 3}
          onClick={(e: any) => {
            e.preventDefault();
            if ((comp.name || "").length > 3)
            addComp(cmp);
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

const InputNumber = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.01,
      defaultValue: "",
      min: 1,
      max: 6,
      precision: 2,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Button {...inc}>+</Button>
      <Input {...input} />
      <Button {...dec}>-</Button>
    </HStack>
  );
};

export default ComplementsInput;
