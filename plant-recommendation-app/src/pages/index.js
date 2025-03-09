import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Flex,
  Stack,
  Link,
  Badge,
  useColorModeValue,
  Icon,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

// カード用のヘルパーコンポーネント
const FeatureCard = ({ title, description, icon }) => {
  return (
    <Box
      bg="white"
      p={5}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.100"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
    >
      <Text fontSize="2xl" mb={2}>
        {icon}
      </Text>
      <Heading size="md" mb={2} color="brand.700">
        {title}
      </Heading>
      <Text color="gray.600" fontSize="sm">
        {description}
      </Text>
    </Box>
  );
};

// ランキングアイテム用のヘルパーコンポーネント
const RankingItem = ({ rank, name, category, color = "accent.popular" }) => {
  return (
    <HStack py={2} borderBottomWidth={rank < 5 ? "1px" : "0px"} spacing={3}>
      <Text fontWeight="bold" color={color} w="24px">
        #{rank}
      </Text>
      <Text color="gray.700" flex="1">
        {name}
      </Text>
      {category && (
        <Badge colorScheme="green" size="sm">
          {category}
        </Badge>
      )}
    </HStack>
  );
};

// カテゴリーカード用のヘルパーコンポーネント
const CategoryCard = ({ name, icon }) => {
  return (
    <NextLink href={`/plants?category=${name}`} passHref>
      <Link _hover={{ textDecoration: "none" }} rounded="lg" overflow="hidden">
        <VStack
          p={4}
          bg="white"
          shadow="md"
          spacing={3}
          align="center"
          borderWidth="1px"
          borderColor="gray.100"
          transition="all 0.3s"
          _hover={{
            bg: "brand.50",
            transform: "translateY(-2px)",
            shadow: "lg",
          }}
          rounded="lg"
        >
          <Text fontSize="3xl" mb={1}>
            {icon}
          </Text>
          <Text fontWeight="medium" color="gray.700">
            {name}
          </Text>
        </VStack>
      </Link>
    </NextLink>
  );
};

export default function Home() {
  const bgGradient = useColorModeValue(
    "linear(to-r, brand.100, brand.50)",
    "linear(to-r, brand.900, brand.800)",
  );

  return (
    <>
      <Head>
        <title>植物推薦アプリ</title>
        <meta name="description" content="あなたにぴったりの植物を見つけます" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        {/* ヒーローセクション */}
        <Box bgGradient={bgGradient} py={{ base: 12, md: 20 }} px={4}>
          <Container maxW="container.xl">
            <Stack
              direction={{ base: "column", md: "row" }}
              align="center"
              spacing={{ base: 8, md: 10 }}
              py={{ base: 8, md: 12 }}
            >
              <Stack flex={1} spacing={{ base: 5, md: 8 }}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
                  color="brand.950"
                >
                  <Text as="span">あなたにぴったりの</Text>
                  <br />
                  <Text as="span">植物を見つけましょう</Text>
                </Heading>
                <Text color="gray.600" fontSize={{ base: "lg", md: "xl" }}>
                  ライフスタイルや好みに合った最適な植物をご提案します。
                  簡単なアンケートに答えるだけで、理想の緑のパートナーが見つかります。
                </Text>
                <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                  <NextLink href="/questionnaire" passHref>
                    <Button
                      as="a"
                      size="lg"
                      colorScheme="green"
                      bg="brand.600"
                      _hover={{ bg: "brand.700" }}
                      px={8}
                      rounded="full"
                    >
                      アンケートを始める
                    </Button>
                  </NextLink>
                  <NextLink href="/faq" passHref>
                    <Button
                      as="a"
                      size="lg"
                      variant="outline"
                      colorScheme="green"
                      rounded="full"
                    >
                      初めての方はこちら
                    </Button>
                  </NextLink>
                </Stack>
              </Stack>
              <Flex
                flex={1}
                justify="center"
                align="center"
                position="relative"
                w="full"
                display={{ base: "none", md: "flex" }}
              >
                <Box
                  position="relative"
                  height="300px"
                  rounded="xl"
                  boxShadow="2xl"
                  width="full"
                  overflow="hidden"
                  bg="brand.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="9xl">🪴</Text>
                </Box>
              </Flex>
            </Stack>
          </Container>
        </Box>

        {/* 機能紹介セクション */}
        <Container maxW="container.xl" py={12}>
          <Heading
            as="h2"
            size="lg"
            mb={8}
            textAlign="center"
            color="brand.800"
          >
            このアプリケーションでできること
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <FeatureCard
              icon="🔍"
              title="植物診断"
              description="いくつかの質問に答えるだけで、あなたの環境や好みに最適な植物をご提案します。"
            />
            <FeatureCard
              icon="📋"
              title="育て方ガイド"
              description="推薦された植物の詳細な育て方や管理のポイントをご紹介します。"
            />
            <FeatureCard
              icon="🧠"
              title="MBTIで分析"
              description="あなたの性格タイプに合った植物を見つけることができます。"
            />
          </SimpleGrid>
        </Container>

        {/* カテゴリーセクション */}
        <Box bg="gray.50" py={12}>
          <Container maxW="container.xl">
            <Heading as="h2" size="lg" mb={8} color="brand.800">
              カテゴリーから探す
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              <CategoryCard name="観葉植物" icon="🌿" />
              <CategoryCard name="多肉植物" icon="🌵" />
              <CategoryCard name="ハーブ" icon="🌱" />
              <CategoryCard name="花" icon="🌸" />
            </SimpleGrid>
          </Container>
        </Box>

        {/* ランキングセクション */}
        <Container maxW="container.xl" py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* 人気ランキング */}
            <Box
              bg="white"
              p={6}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Flex align="center" mb={4}>
                <Text fontSize="2xl" mr={2}>
                  🏆
                </Text>
                <Heading size="md" color="accent.popular">
                  人気植物ランキング
                </Heading>
              </Flex>
              <VStack spacing={0} align="stretch" mb={4}>
                <RankingItem rank={1} name="モンステラ" category="観葉植物" />
                <RankingItem rank={2} name="サンスベリア" category="観葉植物" />
                <RankingItem rank={3} name="ポトス" category="観葉植物" />
                <RankingItem rank={4} name="パキラ" category="観葉植物" />
                <RankingItem rank={5} name="エアプランツ" category="観葉植物" />
              </VStack>
              <Flex justify="flex-end">
                <NextLink href="/ranking/popular" passHref>
                  <Link
                    color="accent.popular"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    ランキングをもっと見る <ChevronRightIcon />
                  </Link>
                </NextLink>
              </Flex>
            </Box>

            {/* マニア向けランキング */}
            <Box
              bg="white"
              p={6}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Flex align="center" mb={4}>
                <Text fontSize="2xl" mr={2}>
                  💎
                </Text>
                <Heading size="md" color="accent.mania">
                  マニア向けランキング
                </Heading>
              </Flex>
              <VStack spacing={0} align="stretch" mb={4}>
                <RankingItem
                  rank={1}
                  name="ビロードカズラ"
                  category="観葉植物"
                  color="accent.mania"
                />
                <RankingItem
                  rank={2}
                  name="ウツボカズラ"
                  category="食虫植物"
                  color="accent.mania"
                />
                <RankingItem
                  rank={3}
                  name="アガベ チタノタ"
                  category="多肉植物"
                  color="accent.mania"
                />
                <RankingItem
                  rank={4}
                  name="ビカクシダ"
                  category="観葉植物"
                  color="accent.mania"
                />
                <RankingItem
                  rank={5}
                  name="ホヤ・カルノーサ"
                  category="多肉植物"
                  color="accent.mania"
                />
              </VStack>
              <Flex justify="flex-end">
                <NextLink href="/ranking/mania" passHref>
                  <Link color="accent.mania" fontWeight="medium" fontSize="sm">
                    ランキングをもっと見る <ChevronRightIcon />
                  </Link>
                </NextLink>
              </Flex>
            </Box>
          </SimpleGrid>
        </Container>

        {/* FAQ入口 */}
        <Box bg="gray.50" py={12}>
          <Container maxW="container.xl">
            <Box
              bg="white"
              p={8}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor="gray.200"
              textAlign="center"
            >
              <Flex justify="center" align="center" mb={4} direction="column">
                <Text fontSize="4xl" mb={2}>
                  ❓
                </Text>
                <Heading size="lg" color="brand.800" mb={4}>
                  植物初心者の方へ
                </Heading>
              </Flex>
              <Text color="gray.600" maxW="2xl" mx="auto" mb={6}>
                植物を育てるのが初めての方やよくある質問への回答をご用意しています。
                植物の選び方から育て方まで、知っておくと便利な情報をまとめました。
              </Text>
              <NextLink href="/faq" passHref>
                <Button
                  as="a"
                  size="lg"
                  colorScheme="green"
                  variant="outline"
                  rounded="full"
                  px={8}
                >
                  よくある質問を見る
                </Button>
              </NextLink>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
