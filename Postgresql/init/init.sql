--DBの作成
CREATE DATABASE domain;
GRANT ALL PRIVILEGES ON DATABASE domain TO visionpro;
\c domain

CREATE TABLE T_Corporate (
  no SERIAL,
  corporate_id INTEGER NOT NULL,
  corporate_unique_name varchar(100) NOT NULL,
  corporate_name varchar(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOL DEFAULT '0',
  PRIMARY KEY (corporate_id)
);

INSERT INTO T_Corporate(corporate_id, corporate_unique_name, corporate_name) VALUES(1, 'visionpro', '（株）VisionPro');

CREATE TABLE T_Corporate_DB (
  corporate_id INTEGER NOT NULL,
  db_name varchar(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOL DEFAULT '0',
  PRIMARY KEY (corporate_id, db_name)
);