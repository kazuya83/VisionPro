DBからプログラムまで全てをコンテナ化しているため、dockerを展開するだけでローカルでサーバが立ち上がり、Webアプリが立ち上がります。

# 前提条件
dockerが起動していること<br/>
dockerが起動していない場合,Docker Desktopを起動してdockerが起動するのを待つ Or</br>
sudo service docker start

# docker展開
docker volume create pgadmin4_volume<br/>
docker-compose up

# postgresql接続
psql -U visionpro

# backend URL
http://localhost:8000

# fronend URL
http://localhost:3000<br/>
※３〜５分ほどサーバが立ち上がります

# admin URL
http://localhost:5000

# pgadmin(Postgresql GUI)
http://localhost:8888
