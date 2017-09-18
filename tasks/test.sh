#!/usr/bin/env sh

mocha tests/unit/**/*Tests.js --require tests/unit/init
NODE_ENV=test valimate
