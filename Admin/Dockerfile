FROM python:3.9-alpine

WORKDIR /app

COPY ./app /app

RUN pip install --upgrade pip setuptools
RUN apk --no-cache add build-base
RUN apk --no-cache add postgresql-dev
RUN pip install -r requirements.txt
RUN python3 -m pip install psycopg2