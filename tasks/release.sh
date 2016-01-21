#!/bin/bash
DIST_DIR=dist/

echo "Building dist files..."

if [ -e $DIST_DIR ]
then
	rm -rf $DIST_DIR
fi

git clone https://git.heroku.com/james-wright-prod.git $DIST_DIR

cd $DIST_DIR
cp ../server.js ../package.json ../bower.json .

# I'm think initialising a sub repo in Git is
# copying over the .gitignore file from the parent!
if [ -e .gitignore ]
then
	rm .gitignore
fi


cp -R ../node_modules .
cp -R ../blogs .
cp -R ../data .
cp -R ../init .
cp -R ../models .
cp -R ../public .
cp -R ../routes .
cp -R ../utils .
cp -R ../views .

rm -rf public/vendor

git add -A
git commit -m "Release"
git push origin master
cd ..
