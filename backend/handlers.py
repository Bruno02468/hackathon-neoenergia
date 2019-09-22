#!/bin/env python3

# garantir que somos um módulo
if __name__ == "__main__":
  print("Este arquivo não deve ser executado. Ele é um módulo!")
  sys.exit(0)


# importar os módulos devidos
import falcon
from falcon.media.validators import jsonschema
import util
import consts as cs
import hg
import sys

# converte lista de linhas em json-serializable
def rows2dicts(lrows):
  return list(map(lambda r: dict(r), lrows))

# superclasse para os handlers
class Handler(object):
  description = "Este é o módulo abstrato que não faz nada."
  usage = "GET"
  route = "/nil"
  db = None

  def __init__(self, database):
    self.db = database

# Documentação gerada automagicamente
class Help(Handler):
  description = "Sim, esta API gera a própria docmentação =)"
  usage = "GET retorna tudo"
  route = "/"
  instances = {}

  def add_handler(self, name, h):
    self.instances[name] = {
      "descricao": h.description,
      "como_usar": h.usage,
      "rota": h.route
    }

  def on_get(self, req, resp):
    resp.media = self.instances


class Cidades(Handler):
  description = "Lista cidades e códigos de cidade"
  usage = "GET retorna a lista."
  route = "/cidades"

  def on_get(self, req, resp):
    resp.media = rows2dicts(self.db.cidades());


class Equipamentos(Handler):
  description = "Obtém informações gerais de equipamentos."
  usage = "GET retorna lista com informações básicas."
  route = "/equipamentos/{cod_cidade}"

  def on_get(self, req, resp, cod_cidade):
    resultados = self.db.equipamentos(cod_cidade)
    if resultados:
      resp.media = rows2dicts(resultados)
    else:
      resp.status = falton.HTTP_404


class Equipamento(Handler):
  description = "Retorna dados detalhados sobre um equipamento"
  usage = "GET retorna lista com vários dados"
  route = "/equipamento/{cod_equipamento}"

  def on_get(self, req, resp, cod_equipamento):
    resultados = self.db.equipamento(cod_equipamento)
    if resultados:
      resp.media = dict(resultados)
    else:
      resp.status = falton.HTTP_404


class Ocorrencias(Handler):
  description = "Retorna todas as ocorrências numa cidade e ano"
  usage = "GET com código de cidade e ano retorna a lista"
  route = "/ocorrencias/{cod_cidade}/{ano}"

  def on_get(self, req, resp, cod_cidade, ano):
    resultados = self.db.ocorrencias(cod_cidade, ano)
    if resultados:
      resp.media = rows2dicts(resultados)
    else:
      resp.status = falton.HTTP_404


class Unidades(Handler):
  description = "Listar os as siglas, nome e subtipos das unidades do sistema."
  usage = "GET retorna a lista."
  route = "/unidades"

  def on_get(self, req, resp):
    resp.media = rows2dicts(self.db.unidades())


class PreverTempo(Handler):
  description = "Obter a previsão do tempo para uma cidade."
  usage = "GET com código de cidade retorna os dados de previsão."
  route = "/forecast/{cod_cidade}"

  def on_get(self, req, resp, cod_cidade):
    cidade = self.db.cidade(cod_cidade)
    if not cidade:
      resp.status = falcon.HTTP_404
    else:
      resp.media = hg.get_previsao(cidade["nome"], cidade["estado"])


class RiscoClimatologico(Handler):
  description = ("Obter a relação de risco climatológico dos equipamentos numa "
                 "cidade por código.")
  usage = "GET com código de cidade retorna os dados."
  route = "/risco_climatologico/{cod_cidade}"

  def on_get(self, req, resp, cod_cidade):
    cidade = self.db.cidade(cod_cidade)
    if not cidade:
      resp.status = falcon.HTTP_404
    else:
      resp.media = self.db.relacao_rc(cod_cidade)


class PreverRiscos(Handler):
  description = ("Obter a lista de equipamentos numa cidade que podem estar "
                 "sujeitos a falha de origem climatológica nos próximos dias.")
  usage = "GET com código de cidade retorna os dados."
  route = "/prever_risco/{cod_cidade}"

  def on_get(self, req, resp, cod_cidade):
    cidade = self.db.cidade(cod_cidade)
    if not cidade:
      resp.status = falcon.HTTP_404
      return
    prev = hg.get_previsao(cidade["nome"], cidade["estado"])
    rc = self.db.relacao_rc(cod_cidade)
    dias = {}
    forecast = prev["results"]["forecast"]
    for f in forecast:
      dia = f["date"]
      tempo = f["condition"]
      riscos = {}
      if tempo == "rain":
        rates = cs.RATES_BAD
      elif tempo in ["storm", "hail"]:
        rates = cs.RATES_VERY_BAD
      else:
        rates = cs.RATES_GOOD

      for equip in rc:
        rate = rc[equip]["taxa"]
        if rate >= rates[1]:
          riscos[equip] = "ALTO"
        elif rate > rates[0] and rate < rates[1]:
          riscos[equip] = "MÉDIO"
        else:
          riscos[equip] = "BAIXO"

      dias[dia] = {
        "equipamentos": riscos,
        "tempo": tempo
      }

    resp.media = dias;
