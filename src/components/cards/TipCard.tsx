import { Stack } from "@chakra-ui/react";
import Box from "@component/Box";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { H6, SemiSpan } from "@component/Typography";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";

interface Props {
  tips: TipProps[];
}

interface TipProps {
  title: string;
  text?: string;
  children?: any;
}

const TipBox = ({ ...tip }: TipProps) => (
  <Grid item xs={12} md={6} vertical_spacing={2} horizontal_spacing={8}>
    <Box
      backgroundColor="gray.700"
      padding=".75rem"
      borderRadius={5}
      height="100%"
    >
      <Stack direction={["row"]}>
        <Icon defaultcolor="white" size="1rem">fa/solid/face-grin-stars</Icon>
        <H6 color="gray.white" fontWeight="400" fontSize="0.75rem">
          {tip.title}
        </H6>
      </Stack>
      {tip.text && (
        <SemiSpan color="gray.500" fontSize="0.75rem">
          {tip.text}
        </SemiSpan>
      )}
    </Box>
  </Grid>
);

const TipCard = ({ tips }: Props) =>
  tips.length > 0 && (
    <>
      <Grid container vertical_spacing={1} horizontal_spacing={8}>
        <Grid item xs={12}>
          <SemiSpan fontSize=".75rem">
            Olha aqui, {tips.length} dicas especiais pra você:
          </SemiSpan>
        </Grid>
        {tips.map((tip: TipProps, idx: any) => (
          <TipBox key={idx} {...tip} />
        ))}
        <Grid item xs={12}>
          <FlexBox justifyContent="end">
            <SemiSpan color="gray.600" fontSize="0.75rem">
              Essas dicas foram uteis?
            </SemiSpan>
            <Icon size="1.25rem" color="primary" padding="0px 8px">
              fa/solid/heart
            </Icon>
            <SemiSpan color="gray.600" fontSize="0.75rem">
              Sim
            </SemiSpan>
            <Icon size="1.15rem"  color="error" padding="0px 8px">
              fa/solid/face-frown
            </Icon>
            <SemiSpan color="gray.600" fontSize="0.765rem">
              Não
            </SemiSpan>
          </FlexBox>
        </Grid>
      </Grid>
    </>
  );

export default TipCard;
