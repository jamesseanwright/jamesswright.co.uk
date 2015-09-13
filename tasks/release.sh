#!/bin/bash
echo "Building dist files..."

if [ -e dist/ ]
then
	rm -rf dist/*
fi

cd dist
cp ../server.js ../package.json ../bower.json .

cp -R ../node_modules/ .
cp -R ../blogs/ .
cp -R ../data/ .
cp -R ../init/ .
cp -R ../models/ .
cp -R ../public/ .
rm -R public/vendor/
cp -R ../routes/ .
cp -R ../utils/ .
cp -R ../views/ .

git add -A
git commit -m "Release"
git push -f heroku master
cd ..