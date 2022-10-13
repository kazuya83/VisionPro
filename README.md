DBからプログラムまで全てをコンテナ化しているため、dockerを展開するだけでローカルでサーバが立ち上がり、Webアプリが立ち上がります。

# 前提条件
dockerが起動していること<br/>
dockerが起動していない場合,Docker Desktopを起動してdockerが起動するのを待つ OR</br>
sudo service docker start
```sh
sudo service docker start
```

# Docker展開
```sh
docker volume create pgadmin4_volume
docker-compose up
```

# backend URL
http://localhost:8000

# fronend URL
http://localhost:3000<br/>
※３〜５分ほどサーバが立ち上がります

# admin URL
http://localhost:5000

# pgadmin(Postgresql GUI)
http://localhost:8888
