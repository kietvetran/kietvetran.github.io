#!/bin/bash

if [ "$#" -gt "1" ]; then
    echo "Error: please specify valid profile argument (dev is default): Example:"
    echo $0 [ci, scan, dev]
    exit 1
fi

if [[ "$#" = "1" && "$1" = "ci" ]]; then
    echo "Running CI build"
    npm install
    MOCHA_FILE=./jenkins-test-results.xml
    npm run lint:ci
    npm run test:ci
fi

if [[ "$#" = "1" && "$1" = "scan" ]]; then
    echo "Running vulnerability scan build"
    npm install
    npm run test:ci-scan
fi
