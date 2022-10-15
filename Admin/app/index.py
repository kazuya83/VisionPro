from flask import Flask, render_template
from flask.globals import request
from flask.json import jsonify
import os
from dotenv import load_dotenv
import global_value as g
from UseCases.corporate_list_usecase import CorporateListUseCase
from DBUpgrade.create_db import CreateDB
from DBUpgrade.db_upgrade import DBUpgrade
from DBUpgrade.table_name_list import table
import DBUpgrade.db_upgrade_attach_info as db_upgrade_info
import pprint

app = Flask(__name__)

load_dotenv()
g.DB_HOST = os.environ['DB_HOST']
g.DB_DATABASE = os.environ['DB_DATABASE']
g.DB_USER = os.environ['DB_USER']
g.DB_PASS = os.environ['DB_PASS']
g.ENCRYPT_STR = os.environ['ENCRYPT_STR']

# TODO:一時
import Common.db_common as DB


@app.route("/")
def main():
  return render_template('main.html')


@app.route("/get_corporate_list", methods=["POST"])
def get_corporate_list():
  result = CorporateListUseCase.get_corporate_list()
  res = { 'corporate_list' : result }
  return jsonify(res)

@app.route("/create_corporate", methods=["POST"])
def create_corporate():
  req = request.form
  corporate_name = req['corporate_name']
  corporate_unique_name = req['corporate_unique_name']
  print(corporate_name)

  corporate_id = CreateDB(corporate_unique_name, corporate_name).create_corporate()

  res = {'corporate_id': corporate_id, 'next_upgrade_num': 1 }
  return jsonify(res)

@app.route("/create_corporate_db", methods=['POST'])
def create_corporate_db():
  req = request.form
  corporate_id = int(req['corporate_id'])
  res = { 'status_code': 200, 'message': 'DB作成に成功しました', 'corporate_id': corporate_id, 'next_upgrade_num': 1 }
  # 既に作成済みのエラーしか発生しない程
  try:
    CreateDB('', '', corporate_id).create_corporate_db()
  except Exception as e:
    error_message = f'''
    DB作成でエラーが発生しました
    エラー詳細：{e}
    '''
    res['status_code'] = 500
    res['error_message'] = error_message
  return jsonify(res)

@app.route('/db_upgrade', methods=['POST'])
def db_upgrade():
  req = request.form
  corporate_id = int(req['corporate_id'])
  next_upgrade_num = int(req['next_upgrade_num'])
  dbUpgrader = DBUpgrade(corporate_id)
  result = getattr(dbUpgrader, f'upgrade_{next_upgrade_num}')()
  res = { 'status': result.status_code, 'message': result.message, 'corporate_id': req['corporate_id'], 'next_upgrade_num': get_next_db_upgrade(dbUpgrader, next_upgrade_num) }
  return jsonify(res)

@app.route('/get_table_list', methods=['GET'])
def get_table_list():
  res = { 'table_list': table().get_table_list() }
  return jsonify(res)

@app.route('/get_attach_table_list', methods=['POST'])
def get_attach_table_list():
  req = request.form
  corporate_id = int(req['corporate_id'])
  res = { 'table_list': db_upgrade_info.get_db_upgrade_attach(corporate_id) }
  return jsonify(res)

def get_next_db_upgrade(dbUpgrader:DBUpgrade, upgrade_num:int) -> int:
  next_upgrade_num = upgrade_num+1
  try:
    getattr(dbUpgrader, f'upgrade_{next_upgrade_num}')
  except Exception:
      return -1
  return next_upgrade_num
