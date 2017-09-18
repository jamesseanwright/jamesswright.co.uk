#! /bin/bash
# Starts the server and relaunches when files change
./tasks/build-js.sh
./tasks/build-sass.sh --watch &
SASS_PID=$!
echo "node-sass compiler running on PID $SASS_PID"

# nodemon ignores some directories, which are listed in
# nodemon.json
NODE_ENV=development ./node_modules/.bin/nodemon server.js
trap "kill $SASS_PID" SIGTERM SIGKILL
