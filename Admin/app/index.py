from flask import Flask, render_template
from flask.globals import request
from flask.json import jsonify
import os
from dotenv import load_dotenv
import global_value as g
from UseCases.corporate_list_usecase import CorporateListUseCase

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