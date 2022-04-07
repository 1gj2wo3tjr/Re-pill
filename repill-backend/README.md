# Re:pill

## Backend

backend: Django Project 설정

### Apps

accounts: 계정
- 사용자
- 배송지

community
- 공지사항
- 상품 리뷰

products
- 영양제
- 영양성분
- 장바구니
- 주문

survey
- 설문조사


### Usage & Distribution

#### Python 가상환경 설정
최초 1회 수행
```bash
python -m venv venv
source venv/Script/activate
pip install -r requirements.txt
```

#### 로컬 서버 구동
```bash
source venv/Script/activate
python manage.py makemigrations   # DB 변동사항 발생시
python manage.py migrate          # DB 변동사항 발생시
python manage.py runserver
```

#### Dockerize
```bash
docker build -t repill-backend:{versionnumber} .`
```

#### 배포용 환경설정으로 구동
```bash
python manage.py runserver --settings=backend.settings-prod
```

#### Scripts
11번가 자료 탑재 (`data.json` 생성)
```bash
python data.py
11st OpenAPI API키를 입력하십시오: {발급받은 API키}
검색어를 입력하십시오: {상품목록 검색어}
```

`data.json` DB 탑재
```bash
python load.py
```

----

## Docker-compose Setup

`docker-compose up`: docker-compose 시작 (서비스에 필요한 모든 container를 build, recreate, start 등)
`-d` 옵션: 백그라운드 실행
`-f` 옵션: 파일 지정 (`docker-compose -f docker.compose.yml`처럼 사용)

`docker-compose start`: docker-compose 시작 (이미 존재하는 container를 start), 기본 백그라운드 실행

`docker-compose stop`: docker-compose의 container들을 종료

`docker-compose down`: (docker-compose up과 start의 관계와 비슷) 정의된 network 등과 함께 docker-compose의 container들을 종료/삭제
