import React from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { SemiSpan } from "@component/Typography";

interface TipBoxProps {
  type?: "error" | "info";
  text: string;
}

const TipBox: React.FC<TipBoxProps> = ({ type = "info", text }) => {
  const styles = {
    error: {
      borderColor: "error.main",
      backgroundColor: "error.light",
      iconColor: "error",
      iconType: "fa/solid/circle-xmark",
    },
    info: {
      borderColor: "primary.100",
      backgroundColor: "gray.200",
      iconColor: "secondary",
      iconType: "fa/solid/circle-info",
    },
  };

  const { borderColor, backgroundColor, iconColor, iconType } = styles[type];

  return (
    <Box>
      <Box
        my="1rem"
        p="0.75rem"
        shadow={6}
        border="solid 1px"
        borderColor={borderColor}
        borderRadius="8px"
        backgroundColor={backgroundColor}
      >
        <FlexBox>
          <Icon mt="0.5rem" mr="1rem" color={iconColor}>
            {iconType}
          </Icon>
          <SemiSpan mt="0.5rem" mb="0.5rem" fontSize="0.95rem" color="gray.700">
            {text}
          </SemiSpan>
        </FlexBox>
      </Box>
    </Box>
  );
};

export default TipBox;
