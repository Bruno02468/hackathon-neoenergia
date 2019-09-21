#!/bin/env python3

# garantir módulos
import sys
import os
import json
import sqlite3
import logging
import consts as cs
import util
from datetime import datetime, timedelta, date


# garantir que somos um módulo
if __name__ == "__main__":
  print("Este arquivo não deve ser executado. Ele é um módulo!")
  sys.exit(0)


# agora, inicializar a conexão ao banco
if not os.path.isfile(cs.DBFILE):
  logging.error("O banco não existe. Crie-o com o script configure.py.")
  sys.exit(0)

conn = sqlite3.connect(cs.DBFILE)

logging.info("Conexão ao banco estabelecida.")
