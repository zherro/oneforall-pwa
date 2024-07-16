import { convertHexToRGB, getTheme } from "@utils/utils";
import styled from "styled-components";
import { boxShadow } from "styled-system";

export const StyledLinkCard = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #cdcddd;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 7px -4px ${getTheme("colors.secondary.main")};

  :hover {
    border-color: ${getTheme("colors.primary.main")};
  }
`;
