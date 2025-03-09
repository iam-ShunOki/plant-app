#!/bin/bash

# ホストマシンで実行されるスクリプト

echo "🚀 初期化スクリプトを実行中..."

# 既存のnode_modulesボリュームを削除
echo "🗑️ 既存のnode_modulesボリュームを削除中..."
docker volume rm plant-recommendation-app_node_modules 2>/dev/null || true

# 未使用のボリュームを削除
echo "🧹 未使用のボリュームをクリーンアップ中..."
docker volume prune -f

echo "✅ 初期化完了"