from textwrap import indent
import xmltodict
import requests
import json

baseURL = 'http://openapi.11st.co.kr/openapi/OpenApiService.tmall'
response = requests.get(baseURL, params={
    'key': str(input('11st OpenAPI API키를 입력하십시오: ')),
    'apiCode': 'ProductSearch',
    'keyword': str(input('검색어를 입력하십시오: '))
})

response_XML = xmltodict.parse(response.text)

with open('./data.json', 'w', encoding='utf-8') as f:
    json.dump(response_XML, f, indent='\t', ensure_ascii=False)