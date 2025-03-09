#!/bin/bash

# コンテナ作成後、postCreateCommandで実行されるスクリプト

echo "📦 パッケージのインストールを開始します..."

# npmキャッシュディレクトリをtmpに設定
export NPM_CONFIG_CACHE=/tmp/.npm

# node_modulesディレクトリの権限を再確認
sudo chown -R node:node /workspace/node_modules

# 依存関係をクリーンインストール
echo "🧹 node_modulesをクリーンインストールします..."
rm -rf node_modules package-lock.json || true
npm cache clean --force
npm install

# Prismaクライアントを生成
echo "🔄 Prismaクライアントを生成します..."
npx prisma generate

echo "✅ セットアップが完了しました！"
echo "🌱 以下のコマンドでアプリケーションを起動できます: npm run dev"