import psycopg2
import global_value as g

def get_db_connection():
    con = psycopg2.connect(host=g.DB_HOST,
                            database=g.DB_DATABASE,
                            user=g.DB_USER,
                            password=g.DB_PASS)
    return con

# def execute_select_sql(sql):
#     con = get_db_connection()
#     cursor = con.cursor()
#     cursor.execute(sql)
#     cols = [col.name for col in cursor.description]
#     df = pd.DataFrame(cursor.fetchall(),columns = cols)
#     con.commit()
#     cursor.close()
#     con.close()
#     return df

def execute_sql(sql) -> None:
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute(sql)
    con.commit()
    con.close()