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