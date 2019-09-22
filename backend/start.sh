#!/usr/bin/env bash

rm -f api.pid
gunicorn3 -b localhost:9995 api --reload
