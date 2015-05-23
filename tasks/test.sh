#! /bin/bash
# Runs server and client-side unit tests

mocha tests/unit/server/*

if [ $? -ne 0 ]
	then
		exit $?
fi

NODE_ENV=test node tests/testserver.js &
NODE_PID=$!
trap "kill NODE_PID" SIGTERM SIGKILL
mocha-phantomjs http://localhost:3001
kill $NODE_PID
exit $?