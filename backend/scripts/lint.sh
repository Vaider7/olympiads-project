#!/usr/bin/env bash

set -x

mypy . --show-error-codes
black . --check
isort .
flake8 .