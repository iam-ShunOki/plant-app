#!/bin/bash

echo "Chakra UIとすべての関連パッケージをインストール中..."

# 既存のChakra UI関連パッケージを削除（クリーンインストールのため）
npm uninstall @chakra-ui/react @emotion/react @emotion/styled framer-motion @chakra-ui/icons

# 最新バージョンのパッケージをインストール
npm install @chakra-ui/react@^2.8.2 @emotion/react@^11.11.3 @emotion/styled@^11.11.0 framer-motion@^10.18.0 @chakra-ui/icons@^2.1.1

# キャッシュをクリア
echo "Next.jsのキャッシュをクリア中..."
rm -rf .next

echo "インストール完了！"
echo "npm run dev を実行してアプリケーションを起動してください。"