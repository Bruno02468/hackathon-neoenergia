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
conn.row_factory = sqlite3.Row

logging.info("Conexão ao banco estabelecida.")


def equipamentos_geral(cod_cidade="ATI"):
  cur = conn.cursor()
  cur.execute("SELECT codigo, tipo, fase, ox, oy, clientes FROM equipamentos "
              "WHERE SUBSTR(codigo, 1, 3)=?;", cod_cidade);
  return cur.fetchall()

def equipamento(codigo):
  cur = conn.cursor()
  cur.execute("SELECT codigo, tipo, fase, ox, oy, clientes FROM equipamentos "
              "WHERE codigo=?;", codigo);
  basico = cur.fetchall()
  cur = conn.cursor()
  cur.execute("SELECT COUNT(*) AS falhas, AVG(chi) AS avg_chi, AVG(ci) AS "
              "avg_ci FROM ocorrencias WHERE equipamento=?;" codigo);
  resumo_falhas = cur.fetchone()
  cur = conn.cursor()
  cur.execute("SELECT AVG(chuva.mm) AS avg_mm, AVG(vento.velocidade) AS "
              "avg_velocidade FROM chuvas, vento WHERE vento.data = chuva.data "
              "AND vento.cidade = chuva.cidade AND chuva.cidade IN (SELECT nome "
              "FROM cidades WHERE codigo=?) AND chuva.data IN (SELECT SUBSTR("
              "inicio, 1, 10) FROM ocorrencias WHERE equipamento=? AND "
              "DESCRICAO LIKE \"%AMBI%\");");
  falhas_clima = cur.fetchone();
  return { **basico, **resumo_falhas, **falhas_clima }


