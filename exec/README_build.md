# 빌드 포팅 매뉴얼

## 사용 웹 서버
* Amazon EC2

## 빌드 시 사용되는 환경 변수 및 설정
* backend / frontend 공통
  * `.env`
    * `REACT_APP_REST_API_KEY`: 카카오 API 관련 키
    * `REACT_APP_KAKAO_PAY_KEY`: 카카오 API 관련 키
    * `REACT_APP_JS_KEY`: 카카오 API 관련 키
    * `REACT_APP_REDIRECT_URI`: 카카오페이 결제 이후 이동할 URI
* repill-backend
  * `backend/mysql.cnf`: MySQL 계정 (하단에 설명)
  * `.env`
    * `DJANGO_SECRET_KEY`: Django에서 사용할 SECRET KEY

## 배포 시 특이사항
* `.env` 파일의 내용은 편의에 따라 `docker-compose.yml`에서 `environments`로 따로 정의하실 수 있습니다.
* `docker-compose.yml`이 리버스 프록시로 사용하는 Nginx의 경우, 다음 conf 내용이 적용되도록 volume을 설정합니다.
```
server {
    listen 80 ;
    listen [::]:80 ;

    location / {
	return 301 https://j6a503.p.ssafy.io$request_uri;
    }

}

upstream repill-backend {
    server repill-backend:8000;
}

upstream repill-frontend {
    server repill-frontend:3000;
}


server {
    listen       443 ssl;
    listen  [::]:443 ssl;
    server_name  j6a503.p.ssafy.io;
    client_max_body_size  20M;

    ssl_certificate /etc/letsencrypt/live/j6a503.p.ssafy.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/j6a503.p.ssafy.io/privkey.pem;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
      proxy_set_header  Host $http_host;
      proxy_redirect  off;
      proxy_pass  http://repill-frontend;
    }

    location /api {
	    try_files $uri @proxy_api;
    }

    location /admin {
    	try_files $uri @proxy_api;
    }

    location @proxy_api {
      proxy_set_header  Host $http_host;
      proxy_redirect  off;
      proxy_pass  http://repill-backend;
    }

    location = /50x.html {
	    root	/usr/share/nginx/html;
    }
}
```

## 주요 계정 및 프로퍼티
* MySQL 계정
  * backend/mysql.cnf에 다음을 탑재합니다.
    ```
    [client]
    database = repill_db
    user = ssafyA503
    password = sAs5a0f3y!
    host = j6a503.p.ssafy.io
    port = 3306
    default-character-set = utf8
    ```