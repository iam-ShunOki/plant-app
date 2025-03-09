import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box bg="brand.950" color="white" as="footer" mt="auto">
      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Stack spacing={6}>
            <Flex align="center">
              <Text fontSize="2xl" mr={2}>
                🌱
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                植物推薦アプリ
              </Text>
            </Flex>
            <Text fontSize="sm" color="whiteAlpha.800">
              あなたのライフスタイルや環境に合わせた最適な植物をご提案します。
            </Text>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              リンク
            </Text>
            <NextLink href="/" passHref>
              <Link color="whiteAlpha.800" _hover={{ color: "white" }}>
                ホーム
              </Link>
            </NextLink>
            <NextLink href="/questionnaire" passHref>
              <Link color="whiteAlpha.800" _hover={{ color: "white" }}>
                アンケート
              </Link>
            </NextLink>
            <NextLink href="/plants" passHref>
              <Link color="whiteAlpha.800" _hover={{ color: "white" }}>
                植物一覧
              </Link>
            </NextLink>
            <NextLink href="/faq" passHref>
              <Link color="whiteAlpha.800" _hover={{ color: "white" }}>
                よくある質問
              </Link>
            </NextLink>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              カテゴリー
            </Text>
            <NextLink href="/plants?category=観葉植物" passHref>
              <Link color="whiteAlpha.800" _hover={{ color: "white" }}>
                観葉植物
              </Link>
            </NextLink>
            <NextLink href="/plants?category=多肉植物" passHref>
              <Link color="whiteAlpha.800" _hover={{ color: "white" }}>
                多肉植物
              </Link>
            </NextLink>
            <NextLink href="/plants?category=ハーブ" passHref>
              <Link color="whiteAlpha.800" _hover={{ color: "white" }}>
                ハーブ
              </Link>
            </NextLink>
            <NextLink href="/plants?category=花" passHref>
              <Link color="whiteAlpha.800" _hover={{ color: "white" }}>
                花
              </Link>
            </NextLink>
          </Stack>
        </SimpleGrid>

        <Box
          borderTopWidth={1}
          borderStyle={"solid"}
          borderColor={"whiteAlpha.300"}
          pt={6}
          mt={6}
          textAlign="center"
        >
          <Text fontSize="sm" color="whiteAlpha.600">
            © {new Date().getFullYear()} 植物推薦アプリケーション. All rights
            reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
