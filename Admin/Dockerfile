FROM python:alpine

WORKDIR /app

COPY ./app /app

ENV FLASK_APP=index.py

RUN pip install --upgrade pip setuptools
RUN apk --no-cache add build-base
RUN apk --no-cache add postgresql-dev
RUN pip install -r requirements.txt
RUN python3 -m pip install psycopg2

CMD ["flask", "run", "--host", "0.0.0.0"]