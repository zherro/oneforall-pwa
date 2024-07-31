import { Collapse, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import Typography, { H3, SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";

interface ComplementsStepProps {
  onChange: any;
  value: string;
}

const ComplementsStep = ({ onChange, value }: ComplementsStepProps) => {
  return (
    <>
      <Grid container splited spacing={12}>
        <Grid item xs={12}>
          <H3 marginBottom="0.5rem">Complementos</H3>
          <SemiSpan>Aqui você define os complementos desse item.</SemiSpan>
        </Grid>
        <Grid item xs={12}>
          <RadioGroup onChange={onChange} value={value}>
            <Stack direction="column">
              <Radio value="false" mb="1rem">
                <Typography>Não, item sem complementos</Typography>
              </Radio>
              <Radio value="true" mb="1rem">
                <Typography>Sim, configurar complementos</Typography>
              </Radio>
            </Stack>
          </RadioGroup>
        </Grid>
      </Grid>

      <Collapse in={value == "true"} animateOpacity>
        <Grid container splited spacing={12}>
          <Grid item xs={12}>
            <Stack direction={["column", "row"]} justifyContent="end" mt="1rem">
              <Button
                variant="outlined"
                color="primary"
                style={{
                  fontWeight: "normal",
                  fontSize: "1rem",
                  maxWidth: "350px",
                }}
              >
                <Icon size="1rem" mr="0.5rem" color="primary">
                  plus
                </Icon>
                Criar grupo de complementos
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{
                  fontWeight: "normal",
                  fontSize: "1rem",
                  maxWidth: "350px",
                }}
              >
                <Icon size="1rem" mr="0.5rem" color="primary">
                  fa/regular/copy
                </Icon>
                Copiar de outro item
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default ComplementsStep;
