#!/usr/bin/env python3

# módulo de previsão do tempo

import consts as cs
import urllib.request
import json

def get_previsao(nome_cidade, estado):
  url = ("https://api.hgbrasil.com/weather?key=%s&city_name=%s,%s"
         % (cs.HG_API_KEY, nome_cidade, estado))
  return json.load(urllib.request.urlopen(url, None))
