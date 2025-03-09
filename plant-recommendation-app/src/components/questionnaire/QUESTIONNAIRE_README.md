# 植物推薦アプリケーション - アンケート機能

## アンケート機能の概要

このアンケート機能は、ユーザーの環境や好み、ライフスタイルに基づいて最適な植物を推薦するコア機能です。

### 主な特徴

- ユーザーの基本情報（名前、地域、MBTIタイプなど）を収集
- 環境、目的、生活スタイル、好み、経験レベルなどのカテゴリ別に質問
- 質問に対する回答に基づいて植物をスコアリング
- 上位の植物を結果として表示
- LINE共有機能
- MBTIタイプに基づく植物の推薦の微調整

## 実装内容

### ファイル構成

1. **データモデル**

   - `src/data/questions.js` - アンケート質問データ
   - `src/data/plants.js` - 植物データ

2. **状態管理**

   - `src/context/QuestionnaireContext.js` - Reactコンテキストでアンケート状態を管理

3. **アルゴリズム**

   - `src/utils/recommendation.js` - 推薦アルゴリズムの実装

4. **UI画面**
   - `src/pages/questionnaire/index.js` - アンケート開始ページ
   - `src/pages/questionnaire/questions.js` - 質問表示ページ
   - `src/pages/questionnaire/result.js` - 結果表示ページ

## アンケートフロー

1. **アンケート開始ページ**

   - ユーザーにアンケートの概要と流れを説明
   - 「アンケートを始める」ボタンでアンケートを開始

2. **質問回答ページ**

   - 一問ずつ表示される質問に回答
   - 進行状況バーで現在の進捗を表示
   - 「前へ」「次へ」ボタンで質問間を移動

3. **結果表示ページ**
   - 回答に基づいて推薦された上位の植物を表示
   - 各植物の適合度とおすすめポイントを表示
   - LINE共有ボタンで結果をシェア
   - 再診断やさらなる詳細へのリンク

## 推薦アルゴリズム

植物の推薦は次のアルゴリズムに基づいています：

1. **スコアリング**

   - 各質問の回答に対して、植物ごとにスコアを計算
   - スコアは植物の特性と回答の適合度によって決定

2. **MBTIタイプの反映**

   - ユーザーのMBTIタイプに基づいて、適合する特性を持つ植物にボーナスポイントを付与

3. **正規化**

   - 合計スコアを0〜100のスケールに正規化

4. **結果の選択**
   - スコアの高い上位5つの植物を選出
   - 各植物に対してそのユーザーに合った推薦理由を生成

## 使用しているChakra UIコンポーネント

- `Box`, `Container`, `Heading`, `Text` - 基本的なレイアウト要素
- `Button`, `VStack`, `HStack` - UI要素の配置
- `Card`, `CardBody`, `CardHeader`, `CardFooter` - 植物情報や質問のカード表示
- `Progress` - 進行状況と適合度の視覚化
- `Radio`, `RadioGroup`, `Checkbox`, `CheckboxGroup` - 回答選択用入力要素
- `FormControl`, `FormLabel`, `Input`, `Select` - フォーム要素
- `Image`, `Badge`, `Icon` - 視覚的要素
- `SimpleGrid` - レスポンシブなグリッドレイアウト

## カスタマイズ方法

### 質問の追加・変更

`src/data/questions.js`ファイルを編集することで、質問を追加または変更できます：

```javascript
// 質問の追加例
{
  id: 'new-question-id',
  type: 'single-choice',
  category: 'new-category',
  question: '新しい質問文',
  description: '質問の説明',
  options: [
    {
      value: 'option1',
      label: '選択肢1',
      description: '選択肢の説明',
      score: {
        'trait1': 10,
        'trait2': 5,
        'trait3': 0
      }
    },
    // 他の選択肢...
  ]
}
```

### 植物データの追加

`src/data/plants.js`ファイルに新しい植物データを追加できます：

```javascript
{
  id: 21,  // 一意のID
  name: '植物名',
  nameEn: 'English Name',
  scientificName: '学名',
  category: 'カテゴリ',
  difficulty: 'easy',  // easy, medium, hard
  size: 'small',  // small, medium, large
  care: 'low',  // low, medium, high
  waterFrequency: 'rarely',  // rarely, moderate, often
  sunlight: 'bright',  // low, medium, bright, etc.
  temperature: '適温範囲',
  humidity: 'low',  // low, moderate, high
  description: '植物の説明',
  image: '/images/plants/sample.jpg',
  traits: ['特性1', '特性2', '特性3'],  // 特性タグ
  flowering: true,  // 開花するかどうか
  points: [
    'おすすめポイント1',
    'おすすめポイント2',
    'おすすめポイント3',
    'おすすめポイント4'
  ]
}
```

### 推薦アルゴリズムのカスタマイズ

`src/utils/recommendation.js`ファイルを編集することで、スコアリングロジックを調整できます：

- 質問ごとのスコア計算を変更
- MBTIタイプごとの特性マッピングを調整
- スコアの重み付けを調整

## 将来の拡張可能性

1. **APIからのデータ取得**

   - 現在はローカルデータを使用していますが、将来的にはAPIエンドポイントからデータを取得するように変更可能

2. **ユーザーアカウント連携**

   - ユーザーアカウントと連携して、過去のアンケート結果を保存

3. **より高度なパーソナライゼーション**

   - 機械学習アルゴリズムを導入して、より正確な推薦を実現

4. **追加の分析機能**
   - ユーザーの回答パターンの分析
   - 人気の植物や傾向の把握

## 起動方法

1. 必要なパッケージのインストール

```bash
npm install
```

2. 開発サーバーの起動

```bash
npm run dev
```

3. ブラウザで以下のURLにアクセス

```
http://localhost:3000/questionnaire
```

## 注意点

- 画像ファイルは `/public/images/plants/` ディレクトリに配置する必要があります
- 初期データはデモ用のものであり、実際の利用時には専門家による監修を推奨します
- MBTIによる性格分析は補助的なものであり、植物の選定における主要因ではありません
