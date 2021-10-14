#!/bin/sh -e
set -x

autoflake --remove-all-unused-imports --recursive --remove-unused-variables -i . --exclude=__init__.py,venv
black .
isort .