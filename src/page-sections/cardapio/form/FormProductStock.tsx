import { Collapse, useDisclosure } from "@chakra-ui/react";
import MiniTtile from "@component/custom/MiniTitle";
import NumberField from "@component/custom/NumberField";
import SwitchField from "@component/custom/SwitchField";
import Grid from "@component/grid/Grid";
import Typography, { SemiSpan } from "@component/Typography";

interface StockStepProps {
  values: any;
  setFieldValue: Function;
}

const StockStep = ({ values, setFieldValue }: StockStepProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <Grid item xs={12}>
        <MiniTtile>Estoque</MiniTtile>
      </Grid>
      <Grid item xs={12} spacing={0}>
        <SwitchField
          isChecked={values.has_inventory}
          id="has_inventory"
          label="Ativar estoque desse item?"
          value={values.has_inventory}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Collapse in={values.has_inventory} animateOpacity>
        <Grid item xs={12} spacing={0}>
          <Typography mt="1rem">
            {values.has_inventory}
            Informe a quantidade disponivel em estoque
          </Typography>
          <SemiSpan>
            Ao habilitar o estoque, o item pausará automaticamente quando acabar
          </SemiSpan>
          <NumberField
            mt="1rem"
            id="qtd_inventory"
            values={values}
            setFieldValue={setFieldValue}
          />
        </Grid>
      </Collapse>
    </>
  );
};

export default StockStep;

// end of StockStep
