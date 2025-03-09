FROM node:20-bullseye

# 開発環境に必要なパッケージをインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    wget \
    vim \
    default-mysql-client \
    sudo \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# nodeユーザーにsudo権限を付与
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node && \
    chmod 0440 /etc/sudoers.d/node

# 作業ディレクトリを設定
WORKDIR /workspace

# ディレクトリを作成
RUN mkdir -p /workspace/node_modules

# ポートを公開
EXPOSE 3000