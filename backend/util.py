#!/bin/env python3


# garantir que somos um módulo
if __name__ == "__main__":
  print("Este arquivo não deve ser executado. Ele é um módulo!")
  sys.exit(0)


# importar os módulos devidos
from datetime import datetime, date
import re

def dt2str(dt):
  return dt.isoformat(sep=" ")

# converte string para datetime
def str2dt(s):
  return datetime.strptime(s, "%Y-%m-%d %H:%M:%S")

# converte string para date
def str2d(s):
  return datetime.strptime(s, "%Y-%m-%d").date()

acentos = [
    ["á", "a"],
    ["é", "e"],
    ["í", "i"],
    ["ó", "o"],
    ["ú", "u"],

    ["â", "a"],
    ["ê", "e"],
    ["ô", "o"],

    ["ã", "a"],
    ["õ", "o"],

    ["ü", "u"],

    ["ç", "c"]
]

for index in range(0, len(acentos)):
    acentos[index][0] = re.compile(acentos[index][0])

def str_simplify(string):
    string = string.lower()
    for tup in acentos:
        string = tup[0].sub(tup[1], string)
    return string.upper()
