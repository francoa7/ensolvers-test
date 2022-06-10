import { extendTheme } from "@chakra-ui/react";
import "@fontsource/raleway";

const colors = {};
const fonts = { raleway: "Raleway, sans-serif" };

const theme = extendTheme({ colors, fonts });

export default theme;
