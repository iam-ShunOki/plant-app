import { extendTheme } from "@chakra-ui/react";

// 植物推薦アプリ向けのカスタムテーマ
const theme = extendTheme({
  colors: {
    brand: {
      50: "#f1f8e9",
      100: "#dcedc8",
      200: "#c5e1a5",
      300: "#aed581",
      400: "#9ccc65",
      500: "#8bc34a",
      600: "#7cb342",
      700: "#689f38",
      800: "#558b2f",
      900: "#33691e",
      950: "#2a6d3c",
    },
    accent: {
      line: "#00b900",
      popular: "#ff9800",
      mania: "#1976d2",
    },
  },
  fonts: {
    heading: `'Noto Sans JP', sans-serif`,
    body: `'Noto Sans JP', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "#f8faf7",
      },
    },
  },
  components: {
    Button: {
      // ボタンのバリエーション
      variants: {
        solid: {
          bg: "brand.600",
          color: "white",
          _hover: {
            bg: "brand.700",
          },
        },
        outline: {
          border: "2px solid",
          borderColor: "brand.600",
          color: "brand.600",
        },
        ghost: {
          color: "brand.600",
        },
      },
      // デフォルトのサイズとバリエーション
      defaultProps: {
        size: "md",
        variant: "solid",
      },
    },
  },
});

export default theme;
