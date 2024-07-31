import { Stack } from "@chakra-ui/react";
import Box from "../Box";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Typography, { SemiSpan } from "../Typography";

interface Props {
  type: string;
  icon: string;
  title: string;
  description: string;
  onClick: Function;
}

const CatalogSelectorBox = ({ options }: { options: Props[] }) => {
  return (
    <Grid container splited spacing={6}>
      {options.map((opt, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <Box
            borderColor="primary.main"
            border="1px solid "
            p="0.25rem"
            borderRadius={6}
            cursor="pointer"
            shadow={4}
            onClick={() => opt.onClick(opt.type)}
          >
            <Stack direction={"column"} alignItems={"center"}>
              <Icon color="primary" size="4rem">
                {opt.icon}
              </Icon>
              <Typography fontSize="1.25rem">{opt.title}</Typography>
              <SemiSpan textAlign="center">{opt.description}</SemiSpan>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CatalogSelectorBox;
