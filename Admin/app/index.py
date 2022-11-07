from crypt import methods
from flask import Flask, render_template
from flask.globals import request
from flask.json import jsonify
import os
from dotenv import load_dotenv
import global_value as g
from UseCases.corporate_list_usecase import CorporateListUseCase
from UseCases.navigation_list_usecase import NavigationListUseCase
from DBUpgrade.create_db import CreateDB
from DBUpgrade.db_upgrade import DBUpgrade
from DBUpgrade.db_upgrade_domain import DBUpgradeDomain
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

@app.route('/corporate_setting')
def corporate_setting():
  corporate_id = request.args.get('corporate_id', 0)
  corporate_name = request.args.get('corporate_name', '')
  return render_template('corporate_setting.html', corporate_name=corporate_name, corporate_id=corporate_id)

@app.route('/common_setting')
def common_setting():
  return render_template('common_setting.html')


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
  res = { 'status_code': 200, 'message': f'企業ID:{corporate_id} DB作成に成功しました', 'corporate_id': corporate_id, 'next_upgrade_num': 1 }
  try:
    CreateDB('', '', corporate_id).create_corporate_db()
  except Exception as e:
    error_detail = str(e)
    status_code = 500
    if 'already exists' in str(e):
      error_detail = 'DB作成重複エラー'
      status_code = 400
    error_message = f'''
    企業ID:{corporate_id}
    DB作成でエラーが発生しました
    エラー詳細：{error_detail}
    '''
    res['status_code'] = status_code
    res['message'] = error_message
  return jsonify(res)

@app.route('/db_upgrade', methods=['POST'])
def db_upgrade():
  req = request.form
  corporate_id = int(req['corporate_id'])
  next_upgrade_num = int(req['next_upgrade_num'])
  dbUpgrader = DBUpgrade(corporate_id)
  result = getattr(dbUpgrader, f'upgrade_{next_upgrade_num}')()
  res = { 'status_code': result.status_code, 'message': result.message, 'corporate_id': req['corporate_id'], 'next_upgrade_num': get_next_db_upgrade(dbUpgrader, next_upgrade_num) }
  return jsonify(res)

@app.route('/db_upgrade_domain', methods=['POST'])
def db_upgrade_domain():
  req = request.form
  next_upgrade_num = int(req['next_upgrade_num'])
  dbUpgrader = DBUpgradeDomain()
  result = getattr(dbUpgrader, f'upgrade_{next_upgrade_num}')()
  res = { 'status_code': result.status_code, 'message': result.message, 'next_upgrade_num': get_next_db_upgrade(dbUpgrader, next_upgrade_num) }
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

@app.route('/get_navigation_list', methods=['POST'])
def get_navigation_list():
  result = NavigationListUseCase.get_navigation_list()
  res = { 'corporate_list' : result }
  return jsonify(res)

@app.route('/update_navigation_is_deleted', methods=['POST'])
def update_navigation_is_deleted():
  req = request.form
  navigation_id = req['navigation_id']
  is_deleted = req['next_is_deleted']
  NavigationListUseCase.update_navigation_is_deleted(navigation_id, is_deleted)
  res = { 'message': '表示・非表示の切り替えが完了しました' }
  return jsonify(res)

@app.route('/get_corporate_navigation_list', methods=['POST'])
def get_corporate_navigation_list():
  corporate_id = request.form['corporate_id']
  result = NavigationListUseCase.get_corporate_navigaiton_list(corporate_id)
  res = { 'corporate_list': result }
  return jsonify(res)

@app.route('/update_corporate_navigation_is_deleted', methods=['POST'])
def update_corporate_navigation_is_deleted():
  corporate_id = request.form['corporate_id']
  navigation_id = request.form['navigation_id']
  is_deleted = request.form['is_deleted']
  NavigationListUseCase.update_corporate_navigation_is_deleted(corporate_id, navigation_id, is_deleted)

def get_next_db_upgrade(dbUpgrader, upgrade_num:int) -> int:
  next_upgrade_num = upgrade_num+1
  try:
    getattr(dbUpgrader, f'upgrade_{next_upgrade_num}')
  except Exception:
      return -1
  return next_upgrade_num
