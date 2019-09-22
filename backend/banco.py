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

# retorna a lista de cidades e códigos disponíveis
def cidades():
  cur = conn.cursor()
  cur.execute("SELECT nome, codigo, estado FROM cidades;")
  return cur.fetchall()

# dados de uma cidade pelo código
def cidade(cod_cidade):
  cur = conn.cursor()
  cur.execute("SELECT nome, estado FROM cidades WHERE codigo=?;", (cod_cidade,))
  return cur.fetchone()

# retorna uma lista geral de equipamentos
def equipamentos(cod_cidade):
  print(cod_cidade)
  cur = conn.cursor()
  cur.execute("SELECT codigo, tipo, fase, ox, oy, clientes FROM equipamentos "
              "WHERE SUBSTR(codigo, 1, 3)=?;", (cod_cidade,))
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
  cur.execute("SELECT AVG(chuva.mm) AS avg_mm, AVG(vento.velocidade) AS "
              "avg_velocidade FROM chuva, vento WHERE vento.data = chuva.data "
              "AND vento.cidade = chuva.cidade AND chuva.cidade IN (SELECT nome "
              "FROM cidades WHERE codigo=?) AND chuva.data IN (SELECT SUBSTR("
              "inicio, 1, 10) FROM ocorrencias WHERE equipamento=? AND "
              "DESCRICAO LIKE \"%AMBI%\");", (codigo, codigo))
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

# retorna um histórico de ocorrências para uma cidade num dado ano
def ocorrencias(cod_cidade, ano):
  cur = conn.cursor()
  cur.execute("SELECT * FROM ocorrencias WHERE SUBSTR(equipamento, 1, 3)=? AND "
              "SUBSTR(inicio, 1, 4)=?;", (cod_cidade, str(ano)))
  return cur.fetchall()

# retorna a lista de unidades, com siglas e subtipos
def unidades():
  cur = conn.cursor()
  cur.execute("SELECT nome, sigla, subtipo FROM unidades;");
  return cur.fetchall()

# retorna uma lista de equipamentos com seus números de falhas totais e
# ambientais, usada para estimar o risco climatológico
def relacao_rc(cod_cidade):
  # primeiro, obter as falhas do equipamento envolvendo meio ambiente
  cur = conn.cursor()
  cur.execute("SELECT equipamento, COUNT(*) AS ambientais FROM ocorrencias "
              "WHERE DESCRICAO LIKE \"%AMBI%\""
              "AND SUBSTR(equipamento, 1, 3)=? GROUP BY equipamento;",
              (cod_cidade,))
  ambientais = cur.fetchall()
  # agora, obter todas as falhas
  cur = conn.cursor()
  cur.execute("SELECT equipamento, COUNT(*) AS totais FROM ocorrencias "
              "WHERE SUBSTR(equipamento, 1, 3)=? GROUP BY equipamento;",
              (cod_cidade,))
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
