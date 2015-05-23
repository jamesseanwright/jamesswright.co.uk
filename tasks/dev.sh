#! /bin/bash
# Starts the server and relaunches when files change

# uglifyjs is invoked on restart, but rather than have another watcher,
# nodemon runs it on restart i.e. when clientjs files have changed.
# The duplication sucks but it's better than Grunt and a load of watch tasks
uglifyjs --compress --screw-ie8 --output public/javascripts/main.min.js -- clientjs/*

node-sass sass/main.scss public/stylesheets/main.min.css --watch sass/* --output-style compressed &
SASS_PID=$!
echo "node-sass compiler running on PID $SASS_PID"

# nodemon ignores some directories, which are listed in
# nodemon.json
NODE_ENV=development nodemon server.js
trap "kill $SASS_PID" SIGTERM SIGKILL