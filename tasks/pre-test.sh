#!/bin/bash
npm install -g bower node-sass nodemon mocha mocha-phantomjs uglify-js valimate
npm i && bower i

./tasks/build-js.sh
