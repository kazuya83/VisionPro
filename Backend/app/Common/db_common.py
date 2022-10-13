import psycopg2
import psycopg2.extras
import global_value as g

def get_db_connection(database_name=None):
    con = psycopg2.connect(host=g.DB_HOST,
                            database=g.DB_DATABASE if database_name is None else database_name,
                            user=g.DB_USER,
                            password=g.DB_PASS)
    return con

def execute_select_sql(sql, database_name=None):
    con = get_db_connection(database_name)
    cursor = con.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute(sql)
    results = cursor.fetchall()
    dict_result = []
    for row in results:
        dict_result.append(dict(row))
    con.commit()
    cursor.close()
    con.close()
    return dict_result

def execute_sql(sql) -> None:
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute(sql)
    con.commit()
    con.close()