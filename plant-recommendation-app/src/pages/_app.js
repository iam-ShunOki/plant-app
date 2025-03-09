import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/layout/Layout";
import { QuestionnaireProvider } from "../context/QuestionnaireContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <QuestionnaireProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QuestionnaireProvider>
    </ChakraProvider>
  );
}

export default MyApp;
