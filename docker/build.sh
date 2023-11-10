#!/bin/bash

set -ex

if [ "$#" -eq 0 ]; then
    echo "Usage: ${0} [Image Name]"
    exit 0;
fi

cd $WORKSPACE
docker build --build-arg env=$ENV -t $1 .
