"use client";

import Link from "next/link";
import styled from "styled-components";

import { getTheme } from "@utils/utils";

// STYLED COMPONENTS
export const StyledLink = styled(Link)`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    color: ${getTheme("colors.gray.100")};
  }
`;
