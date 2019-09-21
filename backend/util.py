#!/bin/env python3


# garantir que somos um módulo
if __name__ == "__main__":
  print("Este arquivo não deve ser executado. Ele é um módulo!")
  sys.exit(0)


# importar os módulos devidos
from datetime import datetime, date

def dt2str(dt):
  return dt.isoformat(sep=" ")

# converte string para datetime
def str2dt(s):
  return datetime.strptime(s, "%Y-%m-%d %H:%M:%S")

# converte string para date
def str2d(s):
  return datetime.strptime(s, "%Y-%m-%d").date()
