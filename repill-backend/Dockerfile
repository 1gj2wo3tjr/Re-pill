FROM python:3.9

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3-mysqldb \
  && apt-get install -y --no-install-recommends \
    default-libmysqlclient-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . .

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "--settings=backend.settings-prod", "0.0.0.0:8000"]