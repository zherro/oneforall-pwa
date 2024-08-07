import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Link from "next/link";
import MiniSessionTile from "./MiniSessionTitle";
import Grid from "@component/grid/Grid";
import { Divider } from "@chakra-ui/react";

const FormToolbox = ({
  mb = "0px",
  icon,
  title,
  divider,
  actions,
  justifyContent,
}: {
  mb?: string;
  divider?: boolean;
  icon?: string;
  title?: string;
  actions?: {
    color?: string;
    icon?: string;
    title?: string;
    variant?: any;
    link?: string;
  }[];
  justifyContent?: "end" | "start" | "center";
}) => {
  return (
    <>
      <Grid container splited vertical_spacing={6}>
        <Grid item xs={12}>
          {title && (
            <MiniSessionTile
              justifyContent="end"
              mt="1.5rem"
              title={title}
              icon={icon || ""}
              divider
            />
          )}
          {!title && <Divider width="100%" mb="1rem" />}

          <FlexBox justifyContent="end" mb={mb}>
            {actions?.map((a, idx) => (
              <Link href={a.link || "#"} key={idx}>
                <Button
                  color={a.color || "primary.main"}
                  variant={a.variant || "outlined"}
                  style={{
                    boxShadow: "rgb(30 81 58 / 48%) 0px 1px 6px 0px",
                    fontSize: "14px",
                    padding: "0.5rem",
                    height: "28px",
                  }}
                >
                  <Icon size="16px" mr="0.5rem">
                    {a.icon}
                  </Icon>
                  {a.title}
                </Button>
              </Link>
            ))}
          </FlexBox>
        </Grid>
      </Grid>
    </>
  );
};

export default FormToolbox;
