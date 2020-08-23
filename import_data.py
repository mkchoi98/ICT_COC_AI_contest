import pandas as pd
from bs4 import BeautifulSoup
import requests
import pymysql

start_number = 1
end_number = 1000
data_number = 500
key = '50774e4d78616c7435326c794f674a'
img_key = '467569464164627437316c6942756a'

code_ID = []
status = []
get_date = []
take_place = []
get_name = []
cate = []
get_area = []
get_position = []

img_ID = []
IMAGE_URL = []


def data_import():
    result = []
    number = 0

    url = 'http://openapi.seoul.go.kr:8088/' + str(key) + '/xml/lostArticleInfo/' + str(start_number) + '/' + str(
        end_number) + '/'

    r = requests.get(url)
    html = r.text
    soup = BeautifulSoup(html, 'html.parser')

    for i in range(0, end_number - 1):
        if (soup.select('status')[i].text == '보관' and soup.select('get_date')[i].text[0:4] == '2020' and
                soup.select('take_place')[i].text == '회사내 분실센터'):

            if (number < data_number):
                code_ID.append(soup.select('ID')[i].text)
                status.append(soup.select('status')[i].text)
                get_date.append(soup.select('get_date')[i].text[:10])
                take_place.append(soup.select('take_place')[i].text)
                get_name.append(soup.select('get_name')[i].text)
                cate.append(soup.select('cate')[i].text)
                get_area.append(soup.select('get_area')[i].text)
                get_position.append(soup.select('get_position')[i].text)

                result.append([code_ID[number], status[number], get_date[number], take_place[number], get_name[number],
                               cate[number], get_area[number], get_position[number]])
                number = number + 1

                if (number % 10 == 0):
                    print("-----", number, "개 수집중-----")

            else:
                print(data_number, "개의 데이터가 모두 수집되었습니다.")
                break

    for i in range(len(result[0])):
        for j in range(len(result)):
            result[j][i] = result[j][i].replace('-', '')
            result[j][i] = result[j][i].replace(',', '')

    return result


def select_all():
    conn = pymysql.connect(host='localhost', user='root', password='aksrud99', db='chatbot', charset='utf8')

    try:
        with conn.cursor() as curs:
            sql = "select * from Things"
            curs.execute(sql)
            rs = curs.fetchall()
            for row in rs:
                print(row)
    finally:
        conn.close()


# DB Insert
def insert_test(data_chatbot):
    # DB에 연결
    conn = pymysql.connect(host='localhost', user='root', password='aksrud99', db='chatbot', charset='utf8')
    # 디폴트 커서 생성
    try:
        with conn.cursor() as curs:
            clear = 'TRUNCATE TABLE Things'
            curs.execute(clear)

            sql = 'insert into Things values(%s, %s, %s, %s, %s, %s, %s, %s)'
            for i in range(len(data_chatbot)):
                curs.execute(sql, (data_chatbot[i]))

        conn.commit()
    finally:
        conn.close()


# DB Pretreatment
def Pretreatment(data_chatbot):
    # DB에 연결
    conn = pymysql.connect(host='localhost', user='root', password='aksrud99', db='chatbot', charset='utf8')
    # 디폴트 커서 생성
    try:
        with conn.cursor() as curs:
            sql = [
                'UPDATE things SET get_name=replace(get_name,"휴대폰","핸드폰") where cate="핸드폰"',
                'UPDATE things SET get_name=replace(get_name,"주민증","주민등록증")',
                'UPDATE things SET get_name=replace(get_name,"아이팟","에어팟")',
                'UPDATE things SET get_name=replace(get_name,"가벙","가방") where cate="가방"',
                'UPDATE things SET get_name=replace(get_name,"삼성","삼성갤럭시") where cate="핸드폰"',
                'UPDATE things SET get_name=replace(get_name,"갤","삼성갤럭시") where cate="핸드폰"',
                'UPDATE things SET get_name=replace(get_name,"노트","갤럭시노트") where cate="핸드폰"',
                'UPDATE things SET get_name=replace(get_name,"갤럭시럭시","갤럭시") where cate="핸드폰"',
                'UPDATE things SET get_name=replace(get_name,"삼성삼성","삼성") where cate="핸드폰"',
                'UPDATE things SET get_name=replace(get_name,"삼성갤럭시삼성갤럭시","삼성갤럭시") where cate="핸드폰"',
                'UPDATE things SET get_name=replace(get_name,"삼성갤럭시삼성갤럭시","삼성갤럭시") where cate="핸드폰"',
                'UPDATE things SET get_name=replace(get_name,"갤럭시갤럭시","갤럭시") where cate="핸드폰"'
            ]

            for i in range(len(sql)):
                curs.execute(sql[i])

        conn.commit()
    finally:
        conn.close()


data_chatbot = data_import()
insert_test(data_chatbot)
Pretreatment(data_chatbot)