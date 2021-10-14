#!/usr/bin/env bash

set -x

mypy .
black . --check
isort .
flake8 .