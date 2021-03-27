#本番開発用のdockerfile
# Python3のイメージを使用
FROM python:3.9.2

RUN apt-get update

# 出力時にバッファリングされないようにする
ENV PYTHONUNBUFFERED 1
# /codeというディレクトリを作成
RUN mkdir /code
# ワークディレクトリの設定
WORKDIR /code
#requirements.txtをコンテナ内にコピー
COPY requirements.prod.txt /code/
#pipのアップグレード
RUN pip install --upgrade pip
#8001番ポートを解放
EXPOSE 8001
# pythonとデータベース接続器をインストール(本番環境)
RUN pip install -r requirements.prod.txt
