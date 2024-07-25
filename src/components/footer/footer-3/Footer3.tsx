import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import Typography from "@component/Typography";
import styled from "styled-components";
import { isValidProp } from "@utils/utils";
import FlexBox from "@component/FlexBox";

export default function Footer3() {
  const BoxFooter = styled.div.withConfig({
    shouldForwardProp: (prop) => isValidProp(prop),
  })`
    width: 100%;
    height: 75px;
    background-color: #093d65;
    @media only screen and (max-width: 550px) {
      position: fixed;
      bottom: 0;
      height: 45px;
    }
  `;

  return (
    <>
      <footer>
        <BoxFooter>
          <FlexBox
            justifyContent="center"
            flexDirection="row"
            height="100%"
            alignContent="center"
            justifyItems="center"
            alignItems="center"
          >
            <Typography
              color="white"
              textAlign="center"
              pb="0.75rem"
              fontSize="1.15rem"
            >
              Bimo APP © {new Date().getFullYear()}
            </Typography>
          </FlexBox>
        </BoxFooter>
      </footer>
    </>
  );
}
