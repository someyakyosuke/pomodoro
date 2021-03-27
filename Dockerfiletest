# Python3のイメージを使用
FROM python:3
RUN apt-get update
# 出力時にバッファリングされないようにする
ENV PYTHONUNBUFFERED 1
# /codeというディレクトリを作成
RUN mkdir /code
# ワークディレクトリの設定
WORKDIR /code
#requirements.txtをコンテナ内にコピー
COPY requirements.txt /code/
#pipのアップグレード
RUN pip install --upgrade pip
# pythonとデータベース接続器をインストール
RUN pip install -r requirements.txt



