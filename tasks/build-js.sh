#! /bin/bash
if [ ! -d public/javascripts ]
  then
    mkdir public/javascripts
fi

./node_modules/.bin/browserify -t uglifyify --outfile public/javascripts/main.min.js clientjs/index.js
