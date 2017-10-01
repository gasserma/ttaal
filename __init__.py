"""
The flask application package.
"""
import os
import traceback
import logging
from logging.handlers import RotatingFileHandler

import flask
from flask import Flask, request


app = Flask(__name__)

from flask import render_template
from flask import Markup


@app.errorhandler(500)
def topLevel500(e):
    return flask.jsonify(exception=e.__str__(), trace=traceback.format_exc()), 500

@app.errorhandler(Exception)
def topLevelError(e):
    return flask.jsonify(exception=e.__str__(), trace=traceback.format_exc()), 500


@app.route('/', methods=['GET', 'POST'])
def home():
    rel = os.path.dirname(__file__)
    quotes = os.path.join(rel, "./static/content/quotes.json")
    return render_template(
        'index.html',
        title='Two Trumps and a Lie',
		quotesjson=open(quotes, 'r').read()
    )