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


# superclasse para os handlers
class Handler(object):
  description = "Este é o módulo abstrato que não faz nada."
  usage = "GET"
  route = "/nil"
  db = None

  def __init__(self, database):
    self.db = database

# GUARDADO COMO EXEMPLO PRA VER SE EU PARO DE ESQUECER AS COISAS
class Authenticator(Handler):
  description = "Autenticação: obter um token de autenticação."
  usage = "POST (login, password) retorna token."
  route = "/auth"

  post_schema = {
    "type": "object",
    "title": "Credenciais"
    "description": "Contém as credenciais de um administrador que quer logar."
    "properties": {
      "login": {
        "type": "string",
        "description": "Nome de usuário do administrador"
      },
      "password": {
        "type": "string",
        "description": "Senha do administrador"
      },
    },
    "required": ["login", "password"]
  }

  @jsonschema.validate(post_schema)
  def on_post(self, req, resp):
    login = req.media.get("login")
    password = req.media.get("password")

    if self.db.auth_ok(login, password):
      token, expires = self.db.make_token(login)
      resp.media = {
        "token": token,
        "expires": dt2str(expires)
      }
      resp.set_cookie(cs.ADMTOKEN_NAME, expires, cs.ADMTOKEN_AGE, path="/")
      resp.status = falcon.HTTP_201
    else:
      resp.body = {
        "message": "Login incorreto."
      }
      resp.status = falcon.HTTP_401
