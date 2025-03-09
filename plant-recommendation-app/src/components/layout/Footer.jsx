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
            <Link
              as={NextLink}
              href="/"
              color="whiteAlpha.800"
              _hover={{ color: "white" }}
            >
              ホーム
            </Link>
            <Link
              as={NextLink}
              href="/questionnaire"
              color="whiteAlpha.800"
              _hover={{ color: "white" }}
            >
              アンケート
            </Link>
            <Link
              as={NextLink}
              href="/plants"
              color="whiteAlpha.800"
              _hover={{ color: "white" }}
            >
              植物一覧
            </Link>
            <Link
              as={NextLink}
              href="/faq"
              color="whiteAlpha.800"
              _hover={{ color: "white" }}
            >
              よくある質問
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              カテゴリー
            </Text>
            <Link
              as={NextLink}
              href="/plants?category=観葉植物"
              color="whiteAlpha.800"
              _hover={{ color: "white" }}
            >
              観葉植物
            </Link>
            <Link
              as={NextLink}
              href="/plants?category=多肉植物"
              color="whiteAlpha.800"
              _hover={{ color: "white" }}
            >
              多肉植物
            </Link>
            <Link
              as={NextLink}
              href="/plants?category=ハーブ"
              color="whiteAlpha.800"
              _hover={{ color: "white" }}
            >
              ハーブ
            </Link>
            <Link
              as={NextLink}
              href="/plants?category=花"
              color="whiteAlpha.800"
              _hover={{ color: "white" }}
            >
              花
            </Link>
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
