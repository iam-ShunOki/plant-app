#!/bin/bash

# コンテナが作成された直後に実行されるスクリプト

echo "🛠️ コンテナ作成後の設定を実行中..."

# node_modulesディレクトリの権限を設定
echo "📂 node_modulesディレクトリのパーミッションを設定中..."
sudo mkdir -p /workspace/node_modules
sudo chown -R node:node /workspace
sudo chmod -R 775 /workspace/node_modules

echo "✅ コンテナ作成後の設定が完了しました"