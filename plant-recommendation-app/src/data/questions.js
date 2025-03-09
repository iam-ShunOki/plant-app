// 植物推薦アプリのアンケート質問データ

const questions = [
  {
    id: "user-info",
    type: "user-info",
    title: "あなたについて教えてください",
    description:
      "より正確な植物のレコメンデーションのために、以下の情報をご入力ください。",
    fields: [
      {
        id: "name",
        label: "お名前（ニックネーム）",
        type: "text",
        placeholder: "例: 植物太郎",
        required: true,
      },
      {
        id: "region",
        label: "お住まいの地域",
        type: "select",
        options: [
          { value: "hokkaido", label: "北海道" },
          { value: "tohoku", label: "東北" },
          { value: "kanto", label: "関東" },
          { value: "chubu", label: "中部" },
          { value: "kinki", label: "近畿" },
          { value: "chugoku", label: "中国" },
          { value: "shikoku", label: "四国" },
          { value: "kyushu", label: "九州・沖縄" },
        ],
        required: true,
      },
      {
        id: "mbti",
        label: "MBTI性格タイプ（任意）",
        type: "select",
        options: [
          { value: "", label: "選択してください" },
          { value: "INTJ", label: "INTJ - 建築家" },
          { value: "INTP", label: "INTP - 論理学者" },
          { value: "ENTJ", label: "ENTJ - 指揮官" },
          { value: "ENTP", label: "ENTP - 討論者" },
          { value: "INFJ", label: "INFJ - 提唱者" },
          { value: "INFP", label: "INFP - 仲介者" },
          { value: "ENFJ", label: "ENFJ - 主人公" },
          { value: "ENFP", label: "ENFP - 広報運動家" },
          { value: "ISTJ", label: "ISTJ - 管理者" },
          { value: "ISFJ", label: "ISFJ - 擁護者" },
          { value: "ESTJ", label: "ESTJ - 幹部" },
          { value: "ESFJ", label: "ESFJ - 領事官" },
          { value: "ISTP", label: "ISTP - 巨匠" },
          { value: "ISFP", label: "ISFP - 冒険家" },
          { value: "ESTP", label: "ESTP - 起業家" },
          { value: "ESFP", label: "ESFP - エンターテイナー" },
        ],
        required: false,
      },
    ],
  },
  {
    id: "environment-sunlight",
    type: "single-choice",
    category: "environment",
    question: "あなたのお部屋の日当たりは？",
    description: "植物が置かれる場所の日光の量を教えてください。",
    options: [
      {
        value: "bright-direct",
        label: "明るい（直射日光が入る）",
        description: "窓際で、一日に6時間以上直射日光が入る場所",
        score: {
          "high-light": 10,
          "medium-light": 5,
          "low-light": 0,
        },
      },
      {
        value: "bright-indirect",
        label: "明るい（直射日光は入らない）",
        description: "窓の近くで、明るいが直射日光が遮られる場所",
        score: {
          "high-light": 5,
          "medium-light": 10,
          "low-light": 3,
        },
      },
      {
        value: "medium",
        label: "普通",
        description: "窓から少し離れた場所で、明るさは普通",
        score: {
          "high-light": 2,
          "medium-light": 8,
          "low-light": 6,
        },
      },
      {
        value: "dark",
        label: "暗め",
        description: "窓から離れた場所や、日光があまり入らない部屋",
        score: {
          "high-light": 0,
          "medium-light": 3,
          "low-light": 10,
        },
      },
    ],
  },
  {
    id: "environment-space",
    type: "single-choice",
    category: "environment",
    question: "植物を置くスペースの広さは？",
    description: "植物が成長するのに利用できるスペースを教えてください。",
    options: [
      {
        value: "small",
        label: "小さめ",
        description: "棚や卓上など、限られたスペース",
        score: {
          "small-size": 10,
          "medium-size": 3,
          "large-size": 0,
        },
      },
      {
        value: "medium",
        label: "普通",
        description: "床に置けるが、あまり大きくはないスペース",
        score: {
          "small-size": 5,
          "medium-size": 10,
          "large-size": 3,
        },
      },
      {
        value: "large",
        label: "広め",
        description: "大きな植物も置ける十分なスペース",
        score: {
          "small-size": 3,
          "medium-size": 7,
          "large-size": 10,
        },
      },
    ],
  },
  {
    id: "environment-humidity",
    type: "single-choice",
    category: "environment",
    question: "お部屋の湿度は？",
    description: "植物を置く環境の湿度について教えてください。",
    options: [
      {
        value: "dry",
        label: "乾燥している",
        description: "エアコンや暖房をよく使う、または乾燥しやすい環境",
        score: {
          "high-humidity": 0,
          "medium-humidity": 4,
          "low-humidity": 10,
        },
      },
      {
        value: "normal",
        label: "普通",
        description: "特に乾燥や湿気を感じない一般的な環境",
        score: {
          "high-humidity": 5,
          "medium-humidity": 10,
          "low-humidity": 5,
        },
      },
      {
        value: "humid",
        label: "湿気がある",
        description: "浴室近くや、湿度が高めの環境",
        score: {
          "high-humidity": 10,
          "medium-humidity": 5,
          "low-humidity": 2,
        },
      },
    ],
  },
  {
    id: "purpose",
    type: "multiple-choice",
    category: "purpose",
    question: "植物を育てる主な目的は？",
    description: "複数選択可能です。重要な目的をすべて選んでください。",
    options: [
      {
        value: "interior",
        label: "インテリアとして",
        description: "お部屋の雰囲気づくりや装飾として",
        score: {
          decorative: 10,
          functional: 2,
        },
      },
      {
        value: "air-purification",
        label: "空気清浄のため",
        description: "空気をきれいにする効果を期待して",
        score: {
          "air-purifying": 10,
          functional: 8,
        },
      },
      {
        value: "healing",
        label: "癒しのため",
        description: "緑を見ることでリラックス効果を得たい",
        score: {
          "easy-care": 7,
          decorative: 6,
        },
      },
      {
        value: "hobby",
        label: "趣味として",
        description: "植物の成長を楽しみ、育てる喜びを感じたい",
        score: {
          "interesting-growth": 10,
          challenging: 6,
        },
      },
    ],
    multiSelect: true,
  },
  {
    id: "lifestyle-care",
    type: "single-choice",
    category: "lifestyle",
    question: "週にどのくらい植物のお世話ができますか？",
    description: "水やりや手入れにかけられる時間を教えてください。",
    options: [
      {
        value: "rarely",
        label: "ほとんどできない",
        description: "週に1回未満、または忘れがち",
        score: {
          "low-maintenance": 10,
          "medium-maintenance": 2,
          "high-maintenance": 0,
        },
      },
      {
        value: "sometimes",
        label: "時々できる",
        description: "週に1-2回程度",
        score: {
          "low-maintenance": 7,
          "medium-maintenance": 9,
          "high-maintenance": 3,
        },
      },
      {
        value: "often",
        label: "よくできる",
        description: "週に3-4回程度",
        score: {
          "low-maintenance": 5,
          "medium-maintenance": 8,
          "high-maintenance": 8,
        },
      },
      {
        value: "everyday",
        label: "毎日できる",
        description: "ほぼ毎日手入れする時間がある",
        score: {
          "low-maintenance": 3,
          "medium-maintenance": 7,
          "high-maintenance": 10,
        },
      },
    ],
  },
  {
    id: "lifestyle-travel",
    type: "single-choice",
    category: "lifestyle",
    question: "月に何日くらい家を空けることがありますか？",
    description: "旅行や出張などで家を空ける頻度を教えてください。",
    options: [
      {
        value: "rarely",
        label: "ほとんどない",
        description: "月に1-2日程度",
        score: {
          "low-maintenance": 5,
          "medium-maintenance": 7,
          "high-maintenance": 10,
        },
      },
      {
        value: "sometimes",
        label: "時々ある",
        description: "月に3-5日程度",
        score: {
          "low-maintenance": 7,
          "medium-maintenance": 8,
          "high-maintenance": 3,
        },
      },
      {
        value: "often",
        label: "よくある",
        description: "月に6-10日程度",
        score: {
          "low-maintenance": 10,
          "medium-maintenance": 4,
          "high-maintenance": 0,
        },
      },
      {
        value: "very-often",
        label: "かなり頻繁",
        description: "月に10日以上",
        score: {
          "low-maintenance": 10,
          "medium-maintenance": 2,
          "high-maintenance": 0,
        },
      },
    ],
  },
  {
    id: "preference-size",
    type: "single-choice",
    category: "preference",
    question: "希望する植物のサイズは？",
    description: "育てたい植物の大きさを教えてください。",
    options: [
      {
        value: "small",
        label: "小型",
        description: "卓上やデスクに置けるサイズ",
        score: {
          "small-size": 10,
          "medium-size": 3,
          "large-size": 0,
        },
      },
      {
        value: "medium",
        label: "中型",
        description: "床に置くか、大きめの棚に置けるサイズ",
        score: {
          "small-size": 4,
          "medium-size": 10,
          "large-size": 4,
        },
      },
      {
        value: "large",
        label: "大型",
        description: "床に置く、存在感のあるサイズ",
        score: {
          "small-size": 0,
          "medium-size": 4,
          "large-size": 10,
        },
      },
      {
        value: "any",
        label: "こだわらない",
        description: "サイズは特に重要ではない",
        score: {
          "small-size": 6,
          "medium-size": 6,
          "large-size": 6,
        },
      },
    ],
  },
  {
    id: "preference-flowering",
    type: "single-choice",
    category: "preference",
    question: "花が咲く植物が良いですか？",
    description: "開花する植物への好みを教えてください。",
    options: [
      {
        value: "yes",
        label: "はい、花が咲く植物が良い",
        description: "花を楽しみたい",
        score: {
          flowering: 10,
          foliage: 3,
        },
      },
      {
        value: "no",
        label: "いいえ、葉を楽しむ植物が良い",
        description: "葉の形や色を楽しみたい",
        score: {
          flowering: 0,
          foliage: 10,
        },
      },
      {
        value: "both",
        label: "どちらでも良い",
        description: "特にこだわりはない",
        score: {
          flowering: 6,
          foliage: 6,
        },
      },
    ],
  },
  {
    id: "experience",
    type: "single-choice",
    category: "experience",
    question: "植物を育てた経験はありますか？",
    description: "これまでの植物育成経験を教えてください。",
    options: [
      {
        value: "none",
        label: "初めて",
        description: "植物を育てるのは初めて",
        score: {
          "beginner-friendly": 10,
          challenging: 0,
        },
      },
      {
        value: "little",
        label: "少しある",
        description: "1-2種類の植物を育てたことがある",
        score: {
          "beginner-friendly": 8,
          intermediate: 5,
          challenging: 2,
        },
      },
      {
        value: "some",
        label: "それなりにある",
        description: "数種類の植物を育てた経験がある",
        score: {
          "beginner-friendly": 4,
          intermediate: 8,
          challenging: 6,
        },
      },
      {
        value: "experienced",
        label: "経験豊富",
        description: "様々な植物を育ててきた",
        score: {
          "beginner-friendly": 2,
          intermediate: 6,
          challenging: 10,
        },
      },
    ],
  },
];

export default questions;
