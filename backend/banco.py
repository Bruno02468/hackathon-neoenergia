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

# retorna a lista de subestações e códigos disponíveis
def subestacoes():
  cur = conn.cursor()
  cur.execute("SELECT nome, sigla, cidade FROM subestacoes;")
  return cur.fetchall()

# dados de uma subestacao pelo código
def subestacao(cod_subestacao):
  cur = conn.cursor()
  cur.execute("SELECT nome, cidade FROM subestacoes WHERE sigla=?;",
              (cod_subestacao,))
  return cur.fetchone()

# retorna uma lista geral de equipamentos
def equipamentos(cod_subestacao):
  cur = conn.cursor()
  cur.execute("SELECT codigo, tipo, fase, ox, oy, clientes FROM equipamentos "
              "WHERE SUBSTR(codigo, 1, 3)=?;", (cod_subestacao,))
  return cur.fetchall()

# retorna informações detalhadas sobre um equipamento e suas falhas
def equipamento(codigo):
  cur = conn.cursor()
  resultados = {}
  cur.execute("SELECT codigo, tipo, fase, ox, oy, clientes FROM equipamentos "
              "WHERE codigo=?;", (codigo,))
  basico = cur.fetchone()
  if not basico:
    return None
  resultados = { **dict(basico) }

  cur = conn.cursor()
  cur.execute("SELECT COUNT(*) AS falhas, AVG(chi) AS avg_chi, AVG(ci) AS "
              "avg_ci FROM ocorrencias WHERE equipamento=?;", (codigo,))
  resumo_falhas = cur.fetchone()
  if resumo_falhas:
    resultados = { **resultados, **dict(resumo_falhas) }

  cur = conn.cursor()
  cur.execute("SELECT nome AS nome_sub, cidade FROM subestacoes WHERE sigla=?;",
              (codigo[:3],))
  infocid = cur.fetchone()
  cidade = "NULL"
  if infocid:
    resultados = { **resultados, **dict(infocid) }
  cidade = infocid["cidade"]

  cur = conn.cursor()
  cur.execute("SELECT AVG(chuva.mm) AS avg_mm, AVG(vento.velocidade) AS "
              "avg_velocidade FROM chuva, vento WHERE vento.data = chuva.data "
              "AND vento.cidade = chuva.cidade AND chuva.cidade IN "
              "(SELECT cidade FROM "
              "subestacoes WHERE sigla=?) AND chuva.data IN (SELECT SUBSTR("
              "inicio, 1, 10) FROM ocorrencias WHERE equipamento=? AND "
              "DESCRICAO LIKE \"%AMBI%\") AND chuva.cidade = vento.cidade AND "
              "vento.cidade LIKE ?;", (codigo[:3], codigo,
                                             util.str_simplify(cidade)))
  falhas_clima = cur.fetchone()
  if falhas_clima:
    resultados = { **resultados, **dict(falhas_clima) }

  cur = conn.cursor()
  cur.execute("SELECT nome AS tipo, subtipo FROM unidades WHERE sigla=?;",
              (resultados["tipo"],))
  detalhes_tipo = cur.fetchone()
  if detalhes_tipo:
    resultados = { **resultados, **dict(detalhes_tipo) }

  return resultados

# retorna um histórico de ocorrências para uma subestacao num dado ano
def ocorrencias(cod_subestacao, ano):
  cur = conn.cursor()
  cur.execute("SELECT * FROM ocorrencias WHERE SUBSTR(equipamento, 1, 3)=? AND "
              "SUBSTR(inicio, 1, 4)=?;", (cod_subestacao, str(ano)))
  return cur.fetchall()

# retorna a lista de unidades, com siglas e subtipos
def unidades():
  cur = conn.cursor()
  cur.execute("SELECT nome, sigla, subtipo FROM unidades;");
  return cur.fetchall()

# retorna uma lista de equipamentos com seus números de falhas totais e
# ambientais, usada para estimar o risco climatológico
def relacao_rc(cod_subestacao):
  # primeiro, obter as falhas do equipamento envolvendo meio ambiente
  cur = conn.cursor()
  cur.execute("SELECT equipamento, COUNT(*) AS ambientais FROM ocorrencias "
              "WHERE DESCRICAO LIKE \"%AMBI%\""
              "AND SUBSTR(equipamento, 1, 3)=? GROUP BY equipamento;",
              (cod_subestacao,))
  ambientais = cur.fetchall()
  # agora, obter todas as falhas
  cur = conn.cursor()
  cur.execute("SELECT equipamento, COUNT(*) AS totais FROM ocorrencias "
              "WHERE SUBSTR(equipamento, 1, 3)=? GROUP BY equipamento;",
              (cod_subestacao,))
  totais = cur.fetchall()
  # calcular taxas de risco climatológico
  relacao = {}
  for linha in totais:
    relacao[linha["equipamento"]] = {
      "totais": linha["totais"],
      "ambientais": 0,
      "taxa": 0
    }
  for linha in ambientais:
    cod = linha["equipamento"]
    relacao[cod]["ambientais"] = linha["ambientais"]
    denom = relacao[cod]["totais"]
    if denom:
      relacao[cod]["taxa"] = linha["ambientais"]/denom

  return relacao
