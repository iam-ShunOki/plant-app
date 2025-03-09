#!/bin/bash

# 色付きの出力用関数
function echo_color() {
  local color=$1
  local text=$2
  case $color in
    "green") echo -e "\033[0;32m$text\033[0m" ;;
    "blue") echo -e "\033[0;34m$text\033[0m" ;;
    "red") echo -e "\033[0;31m$text\033[0m" ;;
    "yellow") echo -e "\033[0;33m$text\033[0m" ;;
    *) echo "$text" ;;
  esac
}

echo_color "blue" "🚀 植物推薦アプリケーションの開発環境をセットアップします..."

# 実行権限を付与
echo_color "yellow" "📝 スクリプトに実行権限を付与しています..."
chmod +x .devcontainer/initialize.sh
chmod +x .devcontainer/on-create.sh
chmod +x .devcontainer/post-create.sh

# 既存のコンテナをクリーンアップ
echo_color "yellow" "🧹 既存のコンテナを停止・削除しています..."
docker-compose down -v

# 既存のボリュームをクリーンアップ
echo_color "yellow" "🗑️ 未使用のボリュームを削除しています..."
docker volume prune -f

# 新しいコンテナをビルドして起動
echo_color "green" "🏗️ コンテナをビルドしています..."
docker-compose build --no-cache

echo_color "green" "🚀 コンテナを起動しています..."
docker-compose up -d

echo_color "blue" "✅ セットアップが完了しました！"
echo_color "blue" "🌐 アプリケーションは http://localhost:3000 で実行されています"
echo_color "blue" "📊 phpMyAdminは http://localhost:8080 でアクセスできます"
echo_color "blue" "   - ユーザー名: root"
echo_color "blue" "   - パスワード: rootpassword"
echo_color "blue" ""
echo_color "blue" "VSCodeで開発コンテナを起動するには:"
echo_color "blue" "1. VSCodeでプロジェクトを開く"
echo_color "blue" "2. コマンドパレット(F1キー)を開く"
echo_color "blue" "3. 「Remote-Containers: Reopen in Container」を選択"
echo_color "blue" ""
echo_color "yellow" "⚠️ 注意: 初回はパッケージのインストールに時間がかかることがあります"