import React, { createContext, useContext, useState, useEffect } from "react";
import questions from "../data/questions";
import {
  calculateRecommendations,
  adjustRecommendationsByMbti,
} from "../utils/recommendation";

// コンテキストの作成
const QuestionnaireContext = createContext();

// コンテキストプロバイダーコンポーネント
export const QuestionnaireProvider = ({ children }) => {
  // ユーザーの回答を保存するステート
  const [answers, setAnswers] = useState({});

  // 現在の質問インデックス
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // アンケート完了フラグ
  const [isCompleted, setIsCompleted] = useState(false);

  // 結果データ
  const [results, setResults] = useState(null);

  // 進行状況
  const progress = Math.round((currentQuestionIndex / questions.length) * 100);

  // 現在の質問
  const currentQuestion = questions[currentQuestionIndex];

  // 次の質問に進む
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // アンケート完了時に結果を計算
      calculateResults();
      setIsCompleted(true);
    }
  };

  // 前の質問に戻る
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 質問に回答する
  const answerQuestion = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // 特定の質問に直接ジャンプする
  const jumpToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  // アンケートをリセットする
  const resetQuestionnaire = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setResults(null);
  };

  // 結果を計算する
  const calculateResults = () => {
    console.log("結果を計算しています...", answers);

    // デバッグ：回答データの確認
    if (Object.keys(answers).length === 0) {
      console.warn("回答データがありません");
      return;
    }

    // 推薦アルゴリズムを呼び出して結果を取得
    try {
      const recommendedPlants = calculateRecommendations(answers);
      console.log("推薦された植物:", recommendedPlants);

      // MBTIタイプに基づいて結果を調整（オプション）
      const userInfo = answers["user-info"];
      const userMbti = userInfo && userInfo.mbti ? userInfo.mbti : null;

      if (userMbti && userMbti !== "") {
        console.log("MBTIタイプに基づいて調整:", userMbti);
        const adjustedPlants = adjustRecommendationsByMbti(
          userMbti,
          recommendedPlants,
        );
        setResults(adjustedPlants);
      } else {
        setResults(recommendedPlants);
      }
    } catch (error) {
      console.error("推薦計算中にエラーが発生しました:", error);
      // エラーが発生しても、仮のデータを設定
      setResults([
        {
          id: 1,
          name: "モンステラ",
          score: 95,
          image: "/images/plants/monstera.jpg",
          description:
            "大きな切れ込みの入った特徴的な葉が魅力的な植物です。日陰でも育ちやすく、人気の観葉植物です。",
          category: "観葉植物",
          points: [
            "明るい日陰から半日陰で育つ",
            "週1回程度の水やりで十分",
            "インテリアとして存在感がある",
            "初心者にも育てやすい",
          ],
        },
        {
          id: 2,
          name: "サンスベリア",
          score: 87,
          image: "/images/plants/sansevieria.jpg",
          description:
            "縦に伸びる剣状の葉が特徴的な多肉植物です。非常に丈夫で水やりの頻度も少なく済みます。",
          category: "多肉植物",
          points: [
            "乾燥に強く忙しい方でも育てやすい",
            "空気清浄効果がある",
            "日当たりが悪い場所でも育つ",
            "病害虫に強い",
          ],
        },
        {
          id: 3,
          name: "ポトス",
          score: 82,
          image: "/images/plants/pothos.jpg",
          description:
            "つる性の観葉植物で、垂らして育てるとインテリア性が高まります。成長が早く育てやすいです。",
          category: "観葉植物",
          points: [
            "成長が早く変化を楽しめる",
            "水やりが少なくても育つ",
            "明るい日陰でも元気に育つ",
            "挿し木で簡単に増やせる",
          ],
        },
      ]);
    }
  };

  // コンテキスト値
  const value = {
    questions,
    answers,
    currentQuestionIndex,
    currentQuestion,
    progress,
    isCompleted,
    results,
    nextQuestion,
    prevQuestion,
    answerQuestion,
    jumpToQuestion,
    resetQuestionnaire,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

// カスタムフック
export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionnaire must be used within a QuestionnaireProvider",
    );
  }
  return context;
};
