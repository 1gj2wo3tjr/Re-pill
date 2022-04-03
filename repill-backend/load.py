import pymysql
import json

conn = pymysql.connect(read_default_file='backend/mysql.cnf')

curs = conn.cursor()

try:
    print('go')
    with open('data.json', encoding='utf-8') as f:
        json_data = json.load(f)
        product_list = json_data['ProductSearchResponse']['Products']['Product']
        
        counts = 0
        print(len(product_list))
        for product in product_list:
            print(product['ProductName'])
            print(product['SellerNick'])
            print(product['ProductPrice'])
            print(int(product['ProductPrice']))
            print(product['ProductImage300'])

            sql = "INSERT INTO products_product(name, company, price, content, thumbnail_url) VALUES (%s, %s, %s, '', %s)"
            val = (product['ProductName'], product['SellerNick'], int(product['ProductPrice']), product['ProductImage300'])
            print(val)
            
            try:
                curs.execute(sql, val)
                counts += 1
            except Exception as e:
                print(e)

        
        conn.commit()
        print(f'{counts} inserted.')
except:
    print('except')
    pass

print('finished')