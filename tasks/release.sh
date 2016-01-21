#!/bin/bash
DIST_DIR=dist/

echo "Building dist files..."

if [ -e $DIST_DIR ]
then
	rm -rf $DIST_DIR
fi

#git clone https://git.heroku.com/james-wright-prod.git $DIST_DIR
mkdir $DIST_DIR
cd $DIST_DIR
cp ../server.js ../package.json ../bower.json .

../tasks/build-js.sh
../tasks/build-sass.sh

cp -R ../node_modules node_modules
cp -R ../blogs blogs
cp -R ../data data
cp -R ../init init
cp -R ../models models
cp -R ../public public
cp -R ../routes routes
cp -R ../utils utils
cp -R ../views views

git add -A
git commit -m "Release"
git push origin master
cd ..
