#! /bin/bash
if [ ! -d public/javascripts ]
  then
    mkdir public/javascripts
fi

uglifyjs --compress --screw-ie8 --output public/javascripts/main.min.js -- clientjs/*
