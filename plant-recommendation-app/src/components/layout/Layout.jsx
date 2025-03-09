import { Flex, Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1">{children}</Box>
      <Footer />
    </Flex>
  );
}
