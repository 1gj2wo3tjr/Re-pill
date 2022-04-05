import pymysql

def post_recomm():
    """
    알고리즘 처리가 끝난 추천 결과를 DB에 로드하는 함수입니다.
    """
    # 4
    
    conn = pymysql.connect(read_default_file='backend/mysql.cnf')
    cur = conn.cursor()
    print("POST REVIEW RECOMMENDATIONS")


    path = 'recommend_ratings.txt'
    cur.execute('DELETE FROM survey_recommend')
    with open(path) as f:
        for line in f:
            token = line.strip().split('::')
            cur.execute('INSERT INTO survey_recommend(user_id, product_id, rating) VALUES(%s, %s, %s)', token)

    print("POST FINISHED")
    conn.commit()
    conn.close()