#!/usr/bin/env python3

# módulo de previsão do tempo

import consts as cs
from urllib.request import Request, urlopen
from urllib.parse import quote
import json
import sys

def get_previsao(nome_cidade):
  url = ("https://api.hgbrasil.com/weather?key=%s&city_name=%s"
         % (cs.HG_API_KEY, quote(nome_cidade)))
  headers = {"User-Agent": ()}
  r = Request(url)
  r.add_header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) "
               "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 "
               "Safari/537.36")
  return json.loads(urlopen(r).read().decode("utf-8"))
