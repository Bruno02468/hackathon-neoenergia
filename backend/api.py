#!/bin/env python3

# esta função gera a API WGSI para ser servida via algum servidor WSGI.
def make_api():
  # inicializar logging

  import logging
  import sys
  import consts as cs
  import os

  loglevel = logging.INFO

  if "-d" in sys.argv or "--debug" in sys.argv:
    loglevel = logging.DEBUG

  logging.basicConfig(format="[%(asctime)s] [%(levelname)s] %(message)s",
                      datefmt="%d/%m/%Y %H:%M:%S", level=loglevel)

  # verificar se já não estamos em execução
  try:
    with open(cs.PIDFILE, "r") as píd_file:
      pid = pid_file.read()
      logging.critical("Parece que já há uma API em execução (PID %s). " % pid +
                       "Excecute o script kill_api.sh.")
    sys.exit(0)
  except:
    if os.path.isfile(cs.PIDFILE):
      logging.critical("Parece que já há uma API em execução e o api.pid está "
                       "ilegível. Execute o script kill_api.sh.")
      sys.exit(0)

  # salvar nosso PID
  try:
    with open(cs.PIDFILE, "w") as pid_file:
      pid_file.write(os.getpid())
      logging.info("PID %d salvo em api.pid." % os.getpid())
  except:
    logging.critical("Impossível abrir api.pid para escrita!")
    sys.exit(0)

  # garantir o único módulo externo
  try:
    import falcon
  except:
    logging.critical("O módulo Falcon precisa estar instalado, execute \"pip3 "
                     "install falcon\" para continuar.")
    sys.exit(0)

  # inicializar uma instância do banco de dados e a API
  import handlers
  import db

  api = falcon.API()
  for handler_class in handlers._all:
    handler = handler_class(db)
    api.add_route(handler.route, handler)
  return api
