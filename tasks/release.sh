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

# I'm think Heroku keeps restoring my dev .gitignore!
if [ -e .gitignore ]
then
  rm .gitignore
fi

git add -A
git commit -m "Release"
git push origin master
cd ..

