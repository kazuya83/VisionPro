--DBの作成
CREATE DATABASE domain;
--ユーザーにDBの権限をまとめて付与
GRANT ALL PRIVILEGES ON DATABASE domain TO visionpro;
\c domain
--テーブルを作成
CREATE TABLE T_Corporate (
  corporate_id SERIAL NOT NULL,
  corporate_uniqu_name varchar(100) NOT NULL,
  corporate_name varchar(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOL DEFAULT '0',
  PRIMARY KEY (corporate_id)
);

INSERT INTO T_Corporate(corporate_uniqu_name, corporate_name) VALUES('visionpro', '（株）VisionPro');