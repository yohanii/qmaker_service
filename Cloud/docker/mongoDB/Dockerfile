# MongoDB의 기본 이미지 사용
FROM mongo:latest

# 로컬에서 mongod.conf 파일을 복사하여 컨테이너 내의 /etc/mongo 디렉토리로 이동
COPY ./mongod.conf /etc/mongo/mongod.conf
COPY init-mongo.js /docker-entrypoint-initdb.d/
# 외부 접속을 허용하기 위해 MongoDB 포트(27017) 오픈
EXPOSE 27017


# MongoDB 실행 시 사용자 정의 설정 파일을 사용하도록 명령어를 지정
CMD ["mongod", "--config", "/etc/mongo/mongod.conf"]