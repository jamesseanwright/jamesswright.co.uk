#! /bin/bash
# Starts the server and relaunches when files change

# TODO: watch for changes in clientjs!
ls
echo "about to uglify"
uglifyjs --compress --output public/javascripts/main.min.js -- clientjs/*

node-sass sass/main.scss public/stylesheets/main.min.css --watch sass/* --output-style compressed &
SASS_PID=$!
echo "node-sass compiler running on PID $SASS_PID"

# nodemon ignores some directories, which are listed in
# nodemon.json
NODE_ENV=development nodemon server.js
trap "kill $SASS_PID" SIGTERM SIGKILL