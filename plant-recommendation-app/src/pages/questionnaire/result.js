import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  SimpleGrid,
  Badge,
  Progress,
  Image,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  List,
  ListItem,
  ListIcon,
  Icon,
  useColorModeValue,
  Spinner,
  Center,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  RepeatIcon,
  LinkIcon,
} from "@chakra-ui/icons";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

// ResultCard コンポーネント - 推薦植物のカード
const ResultCard = ({ plant, rank }) => {
  const accentColor =
    rank === 1
      ? "yellow.500"
      : rank === 2
        ? "gray.400"
        : rank === 3
          ? "orange.300"
          : "brand.500";

  return (
    <Card
      borderWidth="1px"
      borderColor={rank === 1 ? "yellow.300" : "gray.200"}
      borderRadius="xl"
      overflow="hidden"
      boxShadow={rank === 1 ? "lg" : "md"}
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)" }}
      height="100%"
      position="relative"
    >
      {rank === 1 && (
        <Box
          position="absolute"
          top="0"
          right="0"
          bg="yellow.400"
          color="white"
          px={3}
          py={1}
          borderBottomLeftRadius="md"
          fontWeight="bold"
          fontSize="sm"
          zIndex="1"
        >
          ベストマッチ
        </Box>
      )}

      <CardHeader pb={0}>
        <Heading size="md" color="brand.700">
          {plant.name}
        </Heading>
        <Badge colorScheme="green" mt={1}>
          {plant.category}
        </Badge>
      </CardHeader>

      <CardBody pt={2}>
        <Box mb={4} height="200px" overflow="hidden" borderRadius="md">
          <Image
            src={
              plant.image ||
              "https://via.placeholder.com/300x200?text=植物の画像"
            }
            alt={plant.name}
            objectFit="cover"
            w="100%"
            h="100%"
            fallbackSrc="https://via.placeholder.com/300x200?text=画像準備中"
          />
        </Box>

        <Text fontSize="sm" color="gray.600" mb={3}>
          {plant.description}
        </Text>

        <VStack align="stretch" spacing={3}>
          <Box>
            <Text fontWeight="medium" mb={1}>
              適合度
            </Text>
            <Flex align="center">
              <Progress
                value={plant.score}
                size="sm"
                colorScheme="green"
                flex="1"
                mr={2}
                borderRadius="full"
              />
              <Text fontWeight="bold" color={accentColor}>
                {plant.score}%
              </Text>
            </Flex>
          </Box>

          <Box>
            <Text fontWeight="medium" mb={2}>
              おすすめポイント
            </Text>
            <List spacing={1}>
              {plant.points &&
                plant.points.map((point, index) => (
                  <ListItem key={index} fontSize="sm">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    {point}
                  </ListItem>
                ))}
            </List>
          </Box>
        </VStack>
      </CardBody>

      <Divider />

      <CardFooter pt={3}>
        <Button
          as={NextLink}
          href={`/plants/${plant.id}`}
          colorScheme="green"
          variant="outline"
          size="sm"
          width="full"
          rightIcon={<ChevronRightIcon />}
        >
          詳細を見る
        </Button>
      </CardFooter>
    </Card>
  );
};

// ShareButtons コンポーネント - 共有ボタン
const ShareButtons = () => {
  // LINE共有機能
  const handleLineShare = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("植物診断の結果をシェアします！");
      window.open(
        `https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`,
        "_blank",
      );
    }
  };

  return (
    <HStack spacing={4}>
      <Button
        onClick={handleLineShare}
        leftIcon={
          <Icon viewBox="0 0 24 24" color="white">
            <path
              fill="currentColor"
              d="M19.365 9.89c.50 0 .866.37.866.864a.888.888 0 0 1-.866.864H17.24v1.716a.888.888 0 0 1-.865.864.866.866 0 0 1-.864-.864V11.62h-2.126a.888.888 0 0 1-.864-.864c0-.5.375-.865.864-.865h2.126V7.854c0-.5.37-.864.864-.864.497 0 .866.37.866.864V9.89h2.124zm-6.123 3.867a.87.87 0 0 1 0 1.728H4.4a.87.87 0 0 1 0-1.728h8.84zm-.866-3.867a.87.87 0 0 1 0 1.728H4.4a.87.87 0 0 1 0-1.728h7.976zM24 10.418C24 4.663 18.627 0 12 0S0 4.663 0 10.418c0 5.202 4.61 9.56 10.837 10.38.422.09 1 .28 1.144.638.13.326.084.83.04 1.156l-.186 1.114c-.057.344-.252 1.337 1.172.73 1.426-.611 7.687-4.528 10.494-7.753C23.476 14.822 24 12.725 24 10.417z"
            />
          </Icon>
        }
        colorScheme="green"
        bg="#00B900"
        _hover={{ bg: "#00A100" }}
      >
        LINEで共有
      </Button>

      <Button
        leftIcon={<LinkIcon />}
        variant="outline"
        colorScheme="gray"
        onClick={() => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard
              .writeText(window.location.href)
              .then(() => alert("URLをコピーしました！"))
              .catch(() => alert("URLのコピーに失敗しました。"));
          } else {
            alert("お使いのブラウザはこの機能に対応していません。");
          }
        }}
      >
        URLをコピー
      </Button>
    </HStack>
  );
};

// ResultContainer コンポーネント - 結果ページの主要部分
const ResultContainer = () => {
  const { results, resetQuestionnaire, answers, isCompleted } =
    useQuestionnaire();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("結果ページがマウントされました", { results, isCompleted });

    // 結果がロードされるまで少し待つ
    const timer = setTimeout(() => {
      setLoading(false);

      // 結果がない場合はアンケートページにリダイレクト
      if (!results || results.length === 0) {
        console.log("結果がありません、アンケートページにリダイレクトします");
        router.push("/questionnaire");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [results, router]);

  if (loading) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text>結果を読み込んでいます...</Text>
        </VStack>
      </Center>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  // ユーザー情報を取得
  const userInfo = answers["user-info"] || {};
  const userName = userInfo.name || "ゲスト";

  // MBTIタイプを取得
  const mbtiType = userInfo.mbti
    ? (() => {
        const mbtiOptions = {
          INTJ: "INTJ - 建築家",
          INTP: "INTP - 論理学者",
          ENTJ: "ENTJ - 指揮官",
          ENTP: "ENTP - 討論者",
          INFJ: "INFJ - 提唱者",
          INFP: "INFP - 仲介者",
          ENFJ: "ENFJ - 主人公",
          ENFP: "ENFP - 広報運動家",
          ISTJ: "ISTJ - 管理者",
          ISFJ: "ISFJ - 擁護者",
          ESTJ: "ESTJ - 幹部",
          ESFJ: "ESFJ - 領事官",
          ISTP: "ISTP - 巨匠",
          ISFP: "ISFP - 冒険家",
          ESTP: "ESTP - 起業家",
          ESFP: "ESFP - エンターテイナー",
        };
        return mbtiOptions[userInfo.mbti] || userInfo.mbti;
      })()
    : null;

  const bgGradient = useColorModeValue(
    "linear(to-b, green.50, white)",
    "linear(to-b, green.900, gray.800)",
  );

  return (
    <Box>
      <Box bgGradient={bgGradient} py={10} px={4}>
        <Container maxW="container.xl">
          <VStack spacing={6} align="center" textAlign="center">
            <Heading as="h1" size="xl" color="brand.800">
              あなたにおすすめの植物
            </Heading>
            <Text fontSize="lg" maxW="2xl" color="gray.600">
              {userName}さんの環境や好みに合わせて、
              以下の植物をおすすめします。
            </Text>

            {mbtiType && (
              <Badge colorScheme="purple" p={2} borderRadius="full">
                性格タイプ: {mbtiType}
              </Badge>
            )}

            <ShareButtons />
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {results.map((plant, index) => (
            <ResultCard key={plant.id} plant={plant} rank={index + 1} />
          ))}
        </SimpleGrid>

        <VStack mt={16} spacing={8}>
          <Heading as="h2" size="lg" color="brand.800" textAlign="center">
            この結果についてどう思いますか？
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%">
            <Card p={6} textAlign="center" height="100%">
              <VStack spacing={4}>
                <Text fontSize="4xl">🌿</Text>
                <Heading size="md">さらに詳しく知る</Heading>
                <Text color="gray.600">
                  おすすめ植物の詳細情報や育て方を確認してみましょう。
                </Text>
                <Button
                  as={NextLink}
                  href={`/plants/${results[0].id}`}
                  colorScheme="green"
                  rightIcon={<ChevronRightIcon />}
                  mt="auto"
                >
                  詳細を見る
                </Button>
              </VStack>
            </Card>

            <Card p={6} textAlign="center" height="100%">
              <VStack spacing={4}>
                <Text fontSize="4xl">🔄</Text>
                <Heading size="md">もう一度診断する</Heading>
                <Text color="gray.600">
                  別の条件で診断してみることで、新しい植物との出会いがあるかもしれません。
                </Text>
                <Button
                  onClick={resetQuestionnaire}
                  as={NextLink}
                  href="/questionnaire"
                  colorScheme="blue"
                  rightIcon={<RepeatIcon />}
                  mt="auto"
                >
                  再診断する
                </Button>
              </VStack>
            </Card>

            <Card p={6} textAlign="center" height="100%">
              <VStack spacing={4}>
                <Text fontSize="4xl">🔍</Text>
                <Heading size="md">カテゴリから探す</Heading>
                <Text color="gray.600">
                  様々なカテゴリから植物を探すこともできます。
                </Text>
                <Button
                  as={NextLink}
                  href="/plants"
                  colorScheme="teal"
                  rightIcon={<ChevronRightIcon />}
                  mt="auto"
                >
                  植物一覧を見る
                </Button>
              </VStack>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

// 結果ページのメインコンポーネント
export default function ResultPage() {
  return (
    <>
      <Head>
        <title>診断結果 | 植物推薦アプリ</title>
        <meta
          name="description"
          content="あなたにぴったりの植物の診断結果です。"
        />
      </Head>
      <ResultContainer />
    </>
  );
}
