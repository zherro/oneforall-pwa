import React from "react";
import Link from "next/link";

import { FaTimes } from "react-icons/fa";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
  installApp: () => void;
}

export default function AddToOtherBrowser(props: Props) {
  const { closePrompt, doNotShowAgain, installApp } = props;
  //   const searchUrl = `https://www.google.com/search?q=add+to+home+screen+for+common-mobile-browsers`;

  return (
    <FlexBox
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 35%)",
      }}
      justifyContent="center"
    >
      <Box
        padding="0.5rem 1rem"
        style={{
          marginTop: "1rem",
          width: "300px",
          height: "260px",
          backgroundColor: "rgb(71, 71, 113)",
          borderRadius: "10px",
        }}
      >
        <FlexBox justifyContent="end">
          <button
            style={{ float: "right", padding: "0.25rem", color: "white" }}
            onClick={closePrompt}
          >
            <FaTimes className="text-2xl" />
          </button>
        </FlexBox>
        <Typography color="white" fontSize="1.15rem" textAlign="center">
          Adicione a tela incial do seu dispositivo!
        </Typography>
        <FlexBox justifyContent="center">
          <Button
            color="rgb(32 32 51)"
            backgroundColor="primary.text"
            mt="2rem"
            style={{
              fontSize: "1rem",
              fontWeight: "500",
            }}
            onClick={() => installApp()}
          >
            Instalar
          </Button>
        </FlexBox>
        <FlexBox justifyContent="center">
          <Button
            color="primary.text"
            variant="outlined"
            mt="2rem"
            onClick={() => doNotShowAgain()}
          >
            Não mostrar novamente!
          </Button>
        </FlexBox>
      </Box>
    </FlexBox>
  );
}
