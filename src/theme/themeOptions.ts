import merge from "lodash/merge";
import shadows from "./shadows/shadows";
import { colors } from "./colors/colors";
import { deviceSize } from "@utils/constants";
import { Breakpoints, ThemeOption } from "./type";

const breakpoints: Breakpoints = Object.keys(deviceSize).map(
  (key) => deviceSize[key] + "px"
);

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const THEMES = {
  GIFT: "GIFT",
  HEALTH: "HEALTH",
  DEFAULT: "DEFAULT",
  GROCERY: "GROCERY",
  FURNITURE: "FURNITURE",
  BORA_CUIABA: "BORA_CUIABA",
  GREEN: "GREEN",
};

const themesOptions = {
  [THEMES.DEFAULT]: { colors, shadows, breakpoints },
  [THEMES.GROCERY]: { shadows, breakpoints, colors },
  [THEMES.FURNITURE]: {
    shadows,
    breakpoints,
    colors: {
      ...colors,
      primary: { ...colors.primary, main: colors.paste.main },
    },
  },
  [THEMES.HEALTH]: {
    shadows,
    breakpoints,
    colors: {
      ...colors,
      primary: { ...merge({ ...colors.primary }, { ...colors.blue }) },
    },
  },
  [THEMES.GIFT]: {
    shadows,
    breakpoints,
    colors: {
      ...colors,
      primary: { ...colors.primary, main: colors.marron.main },
    },
  },
  [THEMES.BORA_CUIABA]: {
    shadows,
    breakpoints,
    colors: {
      ...colors,
      primary: { ...colors.primary, main: colors.fire.main },
      secondary: {
        ...colors.secondary,
        main: "#d85136",
        900: "#EF4333",
        dark: "#EF4333",
      },
    },
  },
  [THEMES.GREEN]: {
    shadows,
    breakpoints,
    colors: {
      ...colors,
      secondary: {
        light: "#B2EBF2",
        main: "#0097A7",
        dark: "#006064",
        text: "#ffffff",
        900: "#00838F",
        100: "#26C6DA"
      },
      primary: {
        light: "#E0F2F1",
        main: "#00BFA5",
        dark: "#004D40",
        text: "#ffffff",
        100: "#B2DFDB",
        200: "#80CBC4",
        300: "#4DB6AC",
        400: "#26A69A",
        500: "#009688",
        600: "#00897B",
        700: "#00796B",
        800: "#006064",
        900: "#004D40",
      },
    },
  },
};
// 26A69A
// 00C853
export default function getThemeOptions(themes: any, pathname: string) {
  let themeOption: ThemeOption = themesOptions[THEMES.DEFAULT];

  /*
      YOU CAN ALSO REMOVE updateTheme function
      AND FOLLOWING ENTIRE switch case BLOCK.
    */
  const updateTheme = (themeName: string) => {
    themes.theme = themeName;
    themeOption = themesOptions[themes.theme];
  };

  switch (pathname) {
    case "/furniture-shop":
      updateTheme(THEMES.FURNITURE);
      break;

    case "/health-beauty":
      updateTheme(THEMES.HEALTH);
      break;

    case "/gift-shop":
      updateTheme(THEMES.GIFT);
      break;

    // case "/":
    //   updateTheme(THEMES.DEFAULT);
    //   break;

    case "/grocery1":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/grocery2":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/grocery3":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/gadget-shop":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/fashion-shop-1":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/market-1":
      updateTheme(THEMES.DEFAULT);
      break;

    default:
      if (themes.theme) {
        updateTheme(themes.theme);
      } else {
        themeOption = themesOptions[THEMES.DEFAULT];
      }
      break;
  }

  return themeOption;
}
