import { createTheme } from "@mui/material/styles";
import { PaletteMode, colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
};

export type ThemeMode = (typeof themeModes)[keyof typeof themeModes];

const themeConfigs = {
  custom: ({ mode }: { mode?: ThemeMode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#ff0000",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#ff0000",
            },
            secondary: {
              main: "#f44336",
            },
            background: {
              default: colors.grey["100"],
            },
          };

    return createTheme({
      palette: {
        mode: mode as PaletteMode, // Ensure that mode is of type PaletteMode or undefined
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
