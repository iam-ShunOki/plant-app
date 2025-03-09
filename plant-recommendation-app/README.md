# 植物推薦アプリケーション

ユーザーの生活環境や好みに合わせた最適な植物を推薦するウェブアプリケーションです。

## 機能概要

- ユーザーへの質問＆回答収集
- 回答に基づく植物推薦アルゴリズム
- 植物の詳細情報、育て方の表示
- FAQ機能（植物を育てたことがない方向け）
- MBTI性格タイプに基づく植物推薦
- 人気植物ランキングとマニア向けランキング
- LINE共有機能
- レスポンシブデザイン対応

## 開発環境のセットアップ

### 必要条件

- Docker
- Docker Compose
- Git

### 開発環境の起動方法

1. リポジトリをクローン
```bash
git clone https://github.com/your-username/plant-recommendation-app.git
cd plant-recommendation-app
```

2. 開発スクリプトに実行権限を付与
```bash
chmod +x dev.sh
```

3. Docker環境を起動
```bash
./dev.sh start
```

4. データベースのマイグレーションとシードデータの投入
```bash
./dev.sh migrate
./dev.sh seed
```

5. ブラウザでアプリケーションにアクセス
```
http://localhost:3000
```

6. データベース管理画面（phpMyAdmin）にアクセス
```
http://localhost:8080
ユーザー名: root
パスワード: rootpassword
```

### 開発スクリプトの使用方法

- 環境の起動: `./dev.sh start`
- 環境の停止: `./dev.sh stop`
- 環境の再起動: `./dev.sh restart`
- アプリコンテナのシェルに入る: `./dev.sh shell`
- データベースのマイグレーション: `./dev.sh migrate`
- データベースのリセット: `./dev.sh reset-db`
- シードデータの投入: `./dev.sh seed`
- パッケージのインストール: `./dev.sh install [パッケージ名]`
- ログの表示: `./dev.sh logs`
- ヘルプの表示: `./dev.sh help`

## 開発環境の構成

- フロントエンド: React.js / Next.js + TailwindCSS
- バックエンド: Node.js + Express.js
- データベース: MySQL 8.0
- ORM: Prisma
- 開発環境: Docker + Docker Compose

## プロジェクト構成

```
plant-recommendation-app/
├── .devcontainer/           # 開発コンテナ設定
├── public/                  # 静的ファイル
├── src/
│   ├── components/          # 再利用可能なコンポーネント
│   ├── pages/               # Next.jsのページ
│   ├── styles/              # スタイル関連ファイル
│   ├── hooks/               # カスタムフック
│   ├── context/             # Reactコンテキスト
│   ├── utils/               # ユーティリティ関数
│   ├── data/                # 静的データ（開発用）
│   └── constants/           # 定数定義
├── prisma/                  # Prisma ORM
├── scripts/                 # 開発・デプロイスクリプト
└── docker-compose.yml       # Docker Compose設定
```

## デプロイ方法

本番環境へのデプロイは以下の手順で行います：

1. 環境変数の設定
2. ビルドプロセスの実行
3. サーバーへのデプロイ

詳細な手順はデプロイガイドを参照してください。

## 貢献方法

1. このリポジトリをフォーク
2. 機能開発用のブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。