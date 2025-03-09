import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
  Progress,
  Flex,
  useToast,
  Card,
  CardBody,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  QuestionnaireProvider,
  useQuestionnaire,
} from "../../context/QuestionnaireContext";

// UserInfoForm コンポーネント - ユーザー情報入力フォーム
const UserInfoForm = ({ question, onAnswer, currentAnswer }) => {
  const [formData, setFormData] = useState(currentAnswer || {});

  // フォームデータの変更時にonAnswerを呼び出す
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      onAnswer(question.id, formData);
    }
  }, [formData, onAnswer, question.id]);

  // 入力値の変更を処理
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <VStack spacing={6} align="stretch" width="100%">
      {question.fields.map((field) => (
        <FormControl key={field.id} isRequired={field.required}>
          <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
          {field.type === "text" && (
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={handleChange}
            />
          )}
          {field.type === "select" && (
            <Select
              id={field.id}
              placeholder="選択してください"
              value={formData[field.id] || ""}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        </FormControl>
      ))}
    </VStack>
  );
};

// SingleChoiceQuestion コンポーネント - 単一選択の質問
const SingleChoiceQuestion = ({ question, onAnswer, currentAnswer }) => {
  return (
    <RadioGroup
      onChange={(value) => onAnswer(question.id, value)}
      value={currentAnswer || ""}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
        {question.options.map((option) => (
          <Card
            key={option.value}
            borderWidth="1px"
            borderColor={
              currentAnswer === option.value ? "brand.500" : "gray.200"
            }
            bg={currentAnswer === option.value ? "brand.50" : "white"}
            _hover={{ borderColor: "brand.300", shadow: "md" }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={() => onAnswer(question.id, option.value)}
          >
            <CardBody>
              <Flex align="flex-start">
                <Radio
                  value={option.value}
                  isChecked={currentAnswer === option.value}
                  mr={3}
                  mt={1}
                  colorScheme="green"
                />
                <Box>
                  <Heading size="sm" mb={1}>
                    {option.label}
                  </Heading>
                  {option.description && (
                    <Text fontSize="sm" color="gray.600">
                      {option.description}
                    </Text>
                  )}
                </Box>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </RadioGroup>
  );
};

// MultipleChoiceQuestion コンポーネント - 複数選択の質問
const MultipleChoiceQuestion = ({ question, onAnswer, currentAnswer }) => {
  const [selectedValues, setSelectedValues] = useState(currentAnswer || []);

  // 選択肢の変更時にonAnswerを呼び出す
  useEffect(() => {
    onAnswer(question.id, selectedValues);
  }, [selectedValues, onAnswer, question.id]);

  // チェックボックスの変更を処理
  const handleChange = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <VStack align="stretch" spacing={4} width="100%">
      {question.options.map((option) => (
        <Card
          key={option.value}
          borderWidth="1px"
          borderColor={
            selectedValues.includes(option.value) ? "brand.500" : "gray.200"
          }
          bg={selectedValues.includes(option.value) ? "brand.50" : "white"}
          _hover={{ borderColor: "brand.300", shadow: "md" }}
          transition="all 0.2s"
          cursor="pointer"
          onClick={() => handleChange(option.value)}
        >
          <CardBody>
            <Flex align="flex-start">
              <Checkbox
                isChecked={selectedValues.includes(option.value)}
                mr={3}
                mt={1}
                colorScheme="green"
                onChange={() => handleChange(option.value)}
              />
              <Box>
                <Heading size="sm" mb={1}>
                  {option.label}
                </Heading>
                {option.description && (
                  <Text fontSize="sm" color="gray.600">
                    {option.description}
                  </Text>
                )}
              </Box>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

// QuestionCard コンポーネント - 質問カードのラッパー
const QuestionCard = ({ currentQuestion, onAnswer, currentAnswer }) => {
  if (!currentQuestion) return null;

  return (
    <Box width="100%">
      <Heading size="lg" mb={2} color="brand.800">
        {currentQuestion.question || currentQuestion.title}
      </Heading>
      <Text mb={6} color="gray.600">
        {currentQuestion.description}
      </Text>

      {currentQuestion.type === "user-info" && (
        <UserInfoForm
          question={currentQuestion}
          onAnswer={onAnswer}
          currentAnswer={currentAnswer}
        />
      )}

      {currentQuestion.type === "single-choice" && (
        <SingleChoiceQuestion
          question={currentQuestion}
          onAnswer={onAnswer}
          currentAnswer={currentAnswer}
        />
      )}

      {currentQuestion.type === "multiple-choice" && (
        <MultipleChoiceQuestion
          question={currentQuestion}
          onAnswer={onAnswer}
          currentAnswer={currentAnswer}
        />
      )}
    </Box>
  );
};

// QuestionsContainer コンポーネント - 質問ページの主要部分
const QuestionsContainer = () => {
  const router = useRouter();
  const toast = useToast();
  const {
    questions,
    answers,
    currentQuestionIndex,
    currentQuestion,
    progress,
    nextQuestion,
    prevQuestion,
    answerQuestion,
    isCompleted,
  } = useQuestionnaire();

  // 回答の検証
  const validateAnswer = () => {
    if (!currentQuestion) return true;

    // ユーザー情報フォームの検証
    if (currentQuestion.type === "user-info") {
      const formData = answers[currentQuestion.id] || {};

      // 必須フィールドの検証
      const requiredFields = currentQuestion.fields.filter(
        (field) => field.required,
      );
      for (const field of requiredFields) {
        if (!formData[field.id]) {
          toast({
            title: `${field.label}を入力してください`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return false;
        }
      }
      return true;
    }

    // 単一選択質問の検証
    if (currentQuestion.type === "single-choice") {
      if (!answers[currentQuestion.id]) {
        toast({
          title: "選択肢を選んでください",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      return true;
    }

    // 複数選択質問の検証
    if (currentQuestion.type === "multiple-choice") {
      const selectedOptions = answers[currentQuestion.id] || [];
      if (selectedOptions.length === 0) {
        toast({
          title: "少なくとも1つの選択肢を選んでください",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      return true;
    }

    return true;
  };

  // 次へボタンのクリック処理
  const handleNext = () => {
    if (validateAnswer()) {
      if (currentQuestionIndex === questions.length - 1) {
        // 最後の質問の場合は結果を計算して結果ページに遷移
        nextQuestion(); // これによりisCompletedがtrueになり、結果が計算される
      } else {
        nextQuestion();
      }
    }
  };

  // 前へボタンのクリック処理
  const handlePrev = () => {
    prevQuestion();
  };

  // isCompletedフラグが立ったら結果ページに遷移
  useEffect(() => {
    if (isCompleted) {
      console.log("アンケートが完了しました。結果ページに遷移します。");
      router.push("/questionnaire/result");
    }
  }, [isCompleted, router]);

  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box mb={4}>
          <Text fontWeight="medium" mb={1}>
            質問 {currentQuestionIndex + 1} / {questions.length}
          </Text>
          <Progress
            value={progress}
            size="sm"
            colorScheme="green"
            borderRadius="full"
          />
        </Box>

        <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mb={4}>
          <QuestionCard
            currentQuestion={currentQuestion}
            onAnswer={answerQuestion}
            currentAnswer={answers[currentQuestion?.id]}
          />
        </Box>

        <Flex justify="space-between" mt={4}>
          <Button
            onClick={handlePrev}
            leftIcon={<ChevronLeftIcon />}
            isDisabled={currentQuestionIndex === 0}
            variant="outline"
            colorScheme="green"
          >
            前へ
          </Button>
          <Button
            onClick={handleNext}
            rightIcon={<ChevronRightIcon />}
            colorScheme="green"
            bg="brand.600"
            _hover={{ bg: "brand.700" }}
          >
            {currentQuestionIndex === questions.length - 1
              ? "結果を見る"
              : "次へ"}
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

// 質問ページのメインコンポーネント
export default function QuestionsPage() {
  return (
    <>
      <Head>
        <title>植物診断アンケート | 質問</title>
        <meta
          name="description"
          content="あなたにぴったりの植物を見つけるためのアンケートです。"
        />
      </Head>
      <QuestionsContainer />
    </>
  );
}
