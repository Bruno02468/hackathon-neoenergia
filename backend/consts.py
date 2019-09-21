#!/bin/env python3

# garantir que somos um módulo
if __name__ == "__main__":
  print("Este arquivo não deve ser executado. Ele é um módulo!")
  sys.exit(0)

import datetime.time

PIDFILE = "api.pid"
DBFILE = "database.db"
