#!/bin/env python3

# garantir que somos um módulo
if __name__ == "__main__":
  print("Este arquivo não deve ser executado. Ele é um módulo!")
  sys.exit(0)

import datetime.time

PIDFILE = "api.pid"
DBFILE = "database.db"
HG_API_KEY = "5c565192" # sim, temos que eventalmente carregá-la do banco...
RATES_VERY_BAD = [0.2, 0.4]
RATES_BAD = [0.4, 0.6]
RATES_GOOD = [3, 3]
