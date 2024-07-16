"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

// CUSTOM THEME
import theme from "theme";
import GlobalStyles from "theme/global-styles/globalStyles";
import { useAppContext } from "./app-context";

export default function StyledContext({ children }: PropsWithChildren) {
  
  const { state, dispatch } = useAppContext();

  // dispatch({
  //   type: "THEME",
  //   payload: "HEALTH"
  // });

  return (
    <ThemeProvider theme={theme(state.theme)}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
