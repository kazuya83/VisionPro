from flask import Flask, render_template
from flask.globals import request
from flask.json import jsonify
import os
from dotenv import load_dotenv
import global_value as g
from UseCases.corporate_list_usecase import CorporateListUseCase
from DBUpgrade.create_db import CreateDB

app = Flask(__name__)

load_dotenv()
g.DB_HOST = os.environ['DB_HOST']
g.DB_DATABASE = os.environ['DB_DATABASE']
g.DB_USER = os.environ['DB_USER']
g.DB_PASS = os.environ['DB_PASS']

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

  CreateDB(corporate_name, corporate_unique_name).create_corporate()

  res = {'corporate_name': corporate_name }
  return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)