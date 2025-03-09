import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { QuestionnaireProvider } from "../../context/QuestionnaireContext";

// アンケート機能の利点を表示するカードコンポーネント
const FeatureCard = ({ title, description, icon }) => {
  return (
    <Card
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      height="100%"
      _hover={{ transform: "translateY(-5px)", transition: "0.3s" }}
    >
      <CardBody>
        <Flex direction="column" align="center" textAlign="center">
          <Text fontSize="3xl" mb={3}>
            {icon}
          </Text>
          <Heading size="md" mb={2} color="brand.700">
            {title}
          </Heading>
          <Text color="gray.600">{description}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default function QuestionnairePage() {
  const bgGradient = useColorModeValue(
    "linear(to-r, green.50, brand.50)",
    "linear(to-r, green.900, brand.800)",
  );

  return (
    <QuestionnaireProvider>
      <Head>
        <title>植物診断アンケート | 植物推薦アプリ</title>
        <meta
          name="description"
          content="あなたにぴったりの植物を見つけるための短いアンケートです。"
        />
      </Head>

      <Box bgGradient={bgGradient} py={10} px={4} mb={10}>
        <Container maxW="container.xl">
          <VStack spacing={6} align="center" textAlign="center">
            <Heading as="h1" size="xl" color="brand.800">
              植物診断アンケート
            </Heading>
            <Text fontSize="lg" maxW="2xl" color="gray.600">
              あなたの環境や好みに合った最適な植物を見つけるために、
              いくつかの質問にお答えください。 所要時間は約3分です。
            </Text>
            <Button
              as={NextLink}
              href="/questionnaire/questions"
              size="lg"
              colorScheme="green"
              bg="brand.600"
              _hover={{ bg: "brand.700" }}
              rightIcon={<ChevronRightIcon />}
              rounded="full"
              px={8}
              mt={4}
            >
              アンケートを始める
            </Button>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <FeatureCard
            icon="🔍"
            title="パーソナライズされた推薦"
            description="あなたの生活環境や好みに合わせて、最適な植物をご提案します。初心者でも安心して育てられる植物を見つけましょう。"
          />
          <FeatureCard
            icon="📈"
            title="適合度スコア"
            description="あなたの回答と植物の特性を比較し、適合度を数値化。どの植物があなたのライフスタイルに最も合うかがわかります。"
          />
          <FeatureCard
            icon="🧠"
            title="MBTI性格分析"
            description="オプションでMBTI性格タイプを入力すると、あなたの性格や傾向に合った植物をご提案することも可能です。"
          />
        </SimpleGrid>
      </Container>

      <Container maxW="container.xl" py={10}>
        <VStack spacing={8}>
          <Heading as="h2" size="lg" color="brand.800" textAlign="center">
            アンケートの流れ
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} width="100%">
            <Box p={5} textAlign="center" position="relative">
              <Text fontSize="2xl" mb={3}>
                👤
              </Text>
              <Heading size="md" mb={2}>
                Step 1
              </Heading>
              <Text color="gray.600">基本情報の入力</Text>
              <Box
                display={{ base: "none", md: "block" }}
                position="absolute"
                right="-30px"
                top="50%"
                transform="translateY(-50%)"
                fontSize="xl"
                color="gray.300"
              >
                →
              </Box>
            </Box>
            <Box p={5} textAlign="center" position="relative">
              <Text fontSize="2xl" mb={3}>
                ❓
              </Text>
              <Heading size="md" mb={2}>
                Step 2
              </Heading>
              <Text color="gray.600">質問への回答</Text>
              <Box
                display={{ base: "none", md: "block" }}
                position="absolute"
                right="-30px"
                top="50%"
                transform="translateY(-50%)"
                fontSize="xl"
                color="gray.300"
              >
                →
              </Box>
            </Box>
            <Box p={5} textAlign="center" position="relative">
              <Text fontSize="2xl" mb={3}>
                🔄
              </Text>
              <Heading size="md" mb={2}>
                Step 3
              </Heading>
              <Text color="gray.600">結果の計算</Text>
              <Box
                display={{ base: "none", md: "block" }}
                position="absolute"
                right="-30px"
                top="50%"
                transform="translateY(-50%)"
                fontSize="xl"
                color="gray.300"
              >
                →
              </Box>
            </Box>
            <Box p={5} textAlign="center">
              <Text fontSize="2xl" mb={3}>
                🌿
              </Text>
              <Heading size="md" mb={2}>
                Step 4
              </Heading>
              <Text color="gray.600">植物の推薦</Text>
            </Box>
          </SimpleGrid>

          <Box textAlign="center" mt={10}>
            <Button
              as={NextLink}
              href="/questionnaire/questions"
              size="lg"
              colorScheme="green"
              bg="brand.600"
              _hover={{ bg: "brand.700" }}
              rightIcon={<ChevronRightIcon />}
              rounded="full"
              px={8}
            >
              アンケートを始める
            </Button>
          </Box>
        </VStack>
      </Container>
    </QuestionnaireProvider>
  );
}
