#! /bin/bash
echo "Building dist files..."
cp -R .git ../git-backup
rm -rf dist/*
cp -R ../git-backup .git
rm -rf ../git-backup

cp server.js package.json bower.json dist/

cp -R node_modules/ dist/
cp -R blogs/ dist/
cp -R data/ dist/
cp -R init/ dist/
cp -R models/ dist/
cp -R public/ dist/
rm -R dist/public/vendor/
cp -R routes/ dist/
cp -R utils/ dist/
cp -R views/ dist/