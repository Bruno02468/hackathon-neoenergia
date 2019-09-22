#!/bin/env python3

# esta função gera a API WGSI para ser servida via algum servidor WSGI.
# inicializar logging

import logging
import sys
import consts as cs
import os
import inspect

loglevel = logging.INFO

if "-d" in sys.argv or "--debug" in sys.argv:
  loglevel = logging.DEBUG

logging.basicConfig(format="[%(asctime)s] [%(levelname)s] %(message)s",
                    datefmt="%d/%m/%Y %H:%M:%S", level=loglevel)

# garantir o único módulo externo
try:
  import falcon
except:
  logging.critical("O módulo Falcon precisa estar instalado, execute \"pip3 "
                   "install falcon\" para continuar.")
  sys.exit(0)

# inicializar uma instância do banco de dados e a API
import handlers
import banco as db

api = falcon.API()
instances = {}
for subname in dir(handlers):
  member = getattr(handlers, subname)
  if not inspect.isclass(member):
    continue
  handler = member(db)
  instances[subname] = handler
  api.add_route(handler.route, handler)

for name, handler in instances.items():
  instances["Help"].add_handler(name, handler)

application = api
