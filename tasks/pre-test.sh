#!/bin/bash
npm install -g bower node-sass nodemon mocha mocha-phantomjs uglify-js
npm i && bower i

if [ ! -d public/javascripts ]
	then
		mkdir public/javascripts
fi

uglifyjs --compress --output public/javascripts/main.min.js -- clientjs/*