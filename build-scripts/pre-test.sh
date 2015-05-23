#!/bin/bash
npm install -g bower node-sass nodemon mocha mocha-phantomjs uglify-js
npm i && bower i
pwd
ls
echo "Gonna uglify"
uglifyjs --compress --output public/javascripts/main.min.js -- clientjs/*