// 植物推薦アルゴリズムのユーティリティ

import plantsData from "../data/plants"; // この部分は後で実際のAPIやデータベースに置き換えます

/**
 * ユーザーの回答に基づいて植物をスコアリングする関数
 * @param {Object} answers - ユーザーの回答
 * @returns {Array} スコア順にソートされた推薦植物リスト
 */
export const calculateRecommendations = (answers) => {
  // 回答がない場合は空配列を返す
  if (!answers || Object.keys(answers).length === 0) {
    return [];
  }

  // 各植物のスコアを初期化
  const plantScores = plantsData.map((plant) => ({
    ...plant,
    totalScore: 0,
    matchPoints: [],
  }));

  // 環境の質問のスコアリング（日当たり、スペース、湿度）
  if (answers["environment-sunlight"]) {
    const sunlightValue = answers["environment-sunlight"];

    plantScores.forEach((plant) => {
      // 日当たりの質問のオプションからスコアを取得
      const sunlightOptions = {
        "bright-direct": plant.traits.includes("high-light")
          ? 10
          : plant.traits.includes("medium-light")
            ? 5
            : 0,
        "bright-indirect": plant.traits.includes("medium-light")
          ? 10
          : plant.traits.includes("high-light")
            ? 7
            : plant.traits.includes("low-light")
              ? 3
              : 0,
        medium: plant.traits.includes("medium-light")
          ? 10
          : plant.traits.includes("low-light")
            ? 7
            : plant.traits.includes("high-light")
              ? 4
              : 0,
        dark: plant.traits.includes("low-light")
          ? 10
          : plant.traits.includes("medium-light")
            ? 4
            : 0,
      };

      const score = sunlightOptions[sunlightValue] || 0;
      plant.totalScore += score;

      if (score >= 7) {
        plant.matchPoints.push("日当たり条件に最適です");
      }
    });
  }

  // スペースの質問のスコアリング
  if (answers["environment-space"]) {
    const spaceValue = answers["environment-space"];

    plantScores.forEach((plant) => {
      // 植物のサイズ特性に基づいてスコアを計算
      const spaceOptions = {
        small: plant.size === "small" ? 10 : plant.size === "medium" ? 3 : 0,
        medium:
          plant.size === "medium"
            ? 10
            : plant.size === "small"
              ? 7
              : plant.size === "large"
                ? 4
                : 0,
        large:
          plant.size === "large"
            ? 10
            : plant.size === "medium"
              ? 7
              : plant.size === "small"
                ? 3
                : 0,
      };

      const score = spaceOptions[spaceValue] || 0;
      plant.totalScore += score;

      if (score >= 7) {
        plant.matchPoints.push("スペースにぴったりのサイズです");
      }
    });
  }

  // 湿度の質問のスコアリング
  if (answers["environment-humidity"]) {
    const humidityValue = answers["environment-humidity"];

    plantScores.forEach((plant) => {
      // 植物の湿度耐性に基づいてスコアを計算
      const humidityOptions = {
        dry: plant.traits.includes("drought-tolerant")
          ? 10
          : plant.traits.includes("medium-humidity")
            ? 5
            : 0,
        normal: plant.traits.includes("medium-humidity")
          ? 10
          : plant.traits.includes("drought-tolerant") ||
              plant.traits.includes("high-humidity")
            ? 5
            : 0,
        humid: plant.traits.includes("high-humidity")
          ? 10
          : plant.traits.includes("medium-humidity")
            ? 5
            : plant.traits.includes("drought-tolerant")
              ? 0
              : 0,
      };

      const score = humidityOptions[humidityValue] || 0;
      plant.totalScore += score;

      if (score >= 7) {
        plant.matchPoints.push("湿度環境に適しています");
      }
    });
  }

  // 目的の質問のスコアリング（複数選択可能）
  if (answers["purpose"] && Array.isArray(answers["purpose"])) {
    const purposeValues = answers["purpose"];

    plantScores.forEach((plant) => {
      let purposeScore = 0;

      if (
        purposeValues.includes("interior") &&
        plant.traits.includes("decorative")
      ) {
        purposeScore += 10;
        plant.matchPoints.push("インテリア性に優れています");
      }

      if (
        purposeValues.includes("air-purification") &&
        plant.traits.includes("air-purifying")
      ) {
        purposeScore += 10;
        plant.matchPoints.push("空気清浄効果があります");
      }

      if (
        purposeValues.includes("healing") &&
        (plant.traits.includes("easy-care") ||
          plant.traits.includes("decorative"))
      ) {
        purposeScore += 7;
        plant.matchPoints.push("癒し効果が期待できます");
      }

      if (
        purposeValues.includes("hobby") &&
        (plant.traits.includes("interesting-growth") ||
          plant.traits.includes("challenging"))
      ) {
        purposeScore += 8;
        plant.matchPoints.push("育てる楽しさがあります");
      }

      // 選んだ目的の数で割って平均を取る
      plant.totalScore += purposeScore / purposeValues.length;
    });
  }

  // 世話の頻度のスコアリング
  if (answers["lifestyle-care"]) {
    const careValue = answers["lifestyle-care"];

    plantScores.forEach((plant) => {
      // 植物のメンテナンスレベルに基づいてスコアを計算
      const careOptions = {
        rarely: plant.care === "low" ? 10 : plant.care === "medium" ? 3 : 0,
        sometimes:
          plant.care === "low"
            ? 8
            : plant.care === "medium"
              ? 10
              : plant.care === "high"
                ? 3
                : 0,
        often:
          plant.care === "medium"
            ? 10
            : plant.care === "low"
              ? 5
              : plant.care === "high"
                ? 8
                : 0,
        everyday:
          plant.care === "high"
            ? 10
            : plant.care === "medium"
              ? 7
              : plant.care === "low"
                ? 3
                : 0,
      };

      const score = careOptions[careValue] || 0;
      plant.totalScore += score;

      if (score >= 7) {
        if (plant.care === "low") {
          plant.matchPoints.push("手入れが少なくて済みます");
        } else if (plant.care === "medium") {
          plant.matchPoints.push("ちょうど良い手入れ頻度です");
        } else if (plant.care === "high") {
          plant.matchPoints.push("丁寧な手入れが必要ですが、応えてくれます");
        }
      }
    });
  }

  // 旅行頻度のスコアリング
  if (answers["lifestyle-travel"]) {
    const travelValue = answers["lifestyle-travel"];

    plantScores.forEach((plant) => {
      // 植物の水やり頻度に基づいてスコアを計算
      const travelOptions = {
        rarely:
          plant.waterFrequency === "often"
            ? 9
            : plant.waterFrequency === "moderate"
              ? 7
              : plant.waterFrequency === "rarely"
                ? 5
                : 0,
        sometimes:
          plant.waterFrequency === "rarely"
            ? 10
            : plant.waterFrequency === "moderate"
              ? 7
              : plant.waterFrequency === "often"
                ? 3
                : 0,
        often:
          plant.waterFrequency === "rarely"
            ? 10
            : plant.waterFrequency === "moderate"
              ? 5
              : plant.waterFrequency === "often"
                ? 0
                : 0,
        "very-often":
          plant.waterFrequency === "rarely"
            ? 10
            : plant.waterFrequency === "moderate"
              ? 3
              : plant.waterFrequency === "often"
                ? 0
                : 0,
      };

      const score = travelOptions[travelValue] || 0;
      plant.totalScore += score;

      if (
        score >= 7 &&
        (plant.waterFrequency === "rarely" ||
          plant.waterFrequency === "moderate")
      ) {
        plant.matchPoints.push("留守がちでも育てやすいです");
      }
    });
  }

  // サイズの好みのスコアリング
  if (answers["preference-size"]) {
    const sizeValue = answers["preference-size"];

    plantScores.forEach((plant) => {
      // 希望するサイズと植物の実際のサイズを比較
      const sizeOptions = {
        small: plant.size === "small" ? 10 : plant.size === "medium" ? 3 : 0,
        medium:
          plant.size === "medium"
            ? 10
            : plant.size === "small"
              ? 5
              : plant.size === "large"
                ? 5
                : 0,
        large: plant.size === "large" ? 10 : plant.size === "medium" ? 5 : 0,
        any: 7, // どのサイズでも良い場合は中程度のスコア
      };

      const score = sizeOptions[sizeValue] || 0;
      plant.totalScore += score;

      if (score >= 7 && sizeValue !== "any") {
        plant.matchPoints.push("希望通りのサイズです");
      }
    });
  }

  // 花の有無のスコアリング
  if (answers["preference-flowering"]) {
    const flowerValue = answers["preference-flowering"];

    plantScores.forEach((plant) => {
      // 花の好みと植物の特性を比較
      const flowerOptions = {
        yes: plant.flowering ? 10 : 0,
        no: !plant.flowering ? 10 : 0,
        both: 7, // どちらでも良い場合は中程度のスコア
      };

      const score = flowerOptions[flowerValue] || 0;
      plant.totalScore += score;

      if (score >= 7 && flowerValue !== "both") {
        if (plant.flowering) {
          plant.matchPoints.push("美しい花を楽しめます");
        } else {
          plant.matchPoints.push("葉の美しさを楽しめます");
        }
      }
    });
  }

  // 経験レベルのスコアリング
  if (answers["experience"]) {
    const experienceValue = answers["experience"];

    plantScores.forEach((plant) => {
      // 経験レベルと植物の難易度を比較
      const experienceOptions = {
        none:
          plant.difficulty === "easy"
            ? 10
            : plant.difficulty === "medium"
              ? 3
              : 0,
        little:
          plant.difficulty === "easy"
            ? 9
            : plant.difficulty === "medium"
              ? 7
              : plant.difficulty === "hard"
                ? 2
                : 0,
        some:
          plant.difficulty === "easy"
            ? 6
            : plant.difficulty === "medium"
              ? 10
              : plant.difficulty === "hard"
                ? 7
                : 0,
        experienced:
          plant.difficulty === "easy"
            ? 5
            : plant.difficulty === "medium"
              ? 8
              : plant.difficulty === "hard"
                ? 10
                : 0,
      };

      const score = experienceOptions[experienceValue] || 0;
      plant.totalScore += score;

      if (score >= 7) {
        if (plant.difficulty === "easy") {
          plant.matchPoints.push("初心者でも育てやすいです");
        } else if (
          plant.difficulty === "medium" &&
          (experienceValue === "some" || experienceValue === "experienced")
        ) {
          plant.matchPoints.push("あなたの経験レベルに適しています");
        } else if (
          plant.difficulty === "hard" &&
          experienceValue === "experienced"
        ) {
          plant.matchPoints.push("経験者向けの上級植物です");
        }
      }
    });
  }

  // MBTI情報に基づくスコアリング（オプション）
  if (answers["user-info"] && answers["user-info"].mbti) {
    const mbtiType = answers["user-info"].mbti;

    // MBTIタイプごとの相性の良い特性を定義
    const mbtiTraitMap = {
      // 内向的な人には手入れが少なく、静かな存在感のある植物
      INTJ: ["low-maintenance", "structured-growth", "air-purifying"],
      INTP: ["unusual", "low-maintenance", "interesting-growth"],
      INFJ: ["calming", "meaningful", "elegant"],
      INFP: ["unique", "expressive", "low-maintenance"],
      ISTJ: ["reliable", "structured-growth", "traditional"],
      ISFJ: ["reliable", "nurturing", "traditional"],
      ISTP: ["adaptable", "low-maintenance", "functional"],
      ISFP: ["artistic", "unique", "aesthetic"],

      // 外向的な人には成長が早く、存在感のある鮮やかな植物
      ENTJ: ["statement", "structured-growth", "fast-growing"],
      ENTP: ["unusual", "adaptable", "interesting-growth"],
      ENFJ: ["expressive", "nurturing", "flowering"],
      ENFP: ["colorful", "unique", "expressive"],
      ESTJ: ["reliable", "traditional", "structured-growth"],
      ESFJ: ["nurturing", "traditional", "flowering"],
      ESTP: ["adaptable", "statement", "fast-growing"],
      ESFP: ["colorful", "statement", "flowering"],
    };

    const relevantTraits = mbtiTraitMap[mbtiType] || [];

    plantScores.forEach((plant) => {
      let mbtiScore = 0;
      const mbtiMatchPoints = [];

      // 植物の特性とMBTI相性特性を比較
      relevantTraits.forEach((trait) => {
        if (plant.traits.includes(trait)) {
          mbtiScore += 5;
          mbtiMatchPoints.push(trait);
        }
      });

      // MBTIスコアを追加（最大15点）
      if (mbtiScore > 0) {
        plant.totalScore += Math.min(mbtiScore, 15);

        if (mbtiMatchPoints.length > 0) {
          plant.matchPoints.push("あなたの性格タイプに合っています");
        }
      }
    });
  }

  // 各植物の最終スコアを計算（最大100点に正規化）
  const questionCount = Object.keys(answers).filter(
    (key) => key !== "user-info",
  ).length;
  plantScores.forEach((plant) => {
    // 質問あたりの平均配点を計算し、100点満点に換算
    const normalizedScore = Math.round(
      (plant.totalScore / (questionCount * 10)) * 100,
    );
    plant.score = Math.min(Math.max(normalizedScore, 0), 100); // 0-100の範囲に制限

    // おすすめポイントを最大4つに制限
    plant.points = [...new Set(plant.matchPoints)].slice(0, 4);

    // 不要な一時的なプロパティを削除
    delete plant.totalScore;
    delete plant.matchPoints;
  });

  // スコア順にソート
  return plantScores.sort((a, b) => b.score - a.score).slice(0, 5); // 上位5つの植物を返す
};

/**
 * MBTIタイプに基づいて植物の推薦を調整する関数
 * @param {string} mbtiType - MBTIタイプ（例: 'INTJ'）
 * @param {Array} plantList - 植物のリスト
 * @returns {Array} MBTIタイプを考慮した植物リスト
 */
export const adjustRecommendationsByMbti = (mbtiType, plantList) => {
  if (!mbtiType || !plantList || plantList.length === 0) {
    return plantList;
  }

  // MBTIごとの特性マッピング（簡略化）
  const mbtiPreferences = {
    // 内向的で論理的なタイプ
    INTJ: { preferStructured: true, preferLowMaintenance: true },
    INTP: { preferUnusual: true, preferLowMaintenance: true },

    // 内向的で感情的なタイプ
    INFJ: { preferMeaningful: true, preferCalming: true },
    INFP: { preferUnique: true, preferExpressive: true },

    // 外向的で論理的なタイプ
    ENTJ: { preferStatement: true, preferStructured: true },
    ENTP: { preferVariety: true, preferUnusual: true },

    // 外向的で感情的なタイプ
    ENFJ: { preferNurturing: true, preferFlowering: true },
    ENFP: { preferColorful: true, preferExpressive: true },

    // 実際的なタイプ
    ISTJ: { preferReliable: true, preferTraditional: true },
    ISFJ: { preferReliable: true, preferNurturing: true },
    ESTJ: { preferStructured: true, preferTraditional: true },
    ESFJ: { preferTraditional: true, preferFlowering: true },
    ISTP: { preferFunctional: true, preferLowMaintenance: true },
    ISFP: { preferAesthetic: true, preferUnique: true },
    ESTP: { preferAdaptable: true, preferStatement: true },
    ESFP: { preferColorful: true, preferStatement: true },
  };

  const preferences = mbtiPreferences[mbtiType] || {};

  // ここで植物リストをMBTI特性に基づいて微調整できます
  // （実際の実装では、データベースから植物の詳細な特性を取得して行います）

  return plantList;
};
