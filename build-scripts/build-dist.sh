#! /bin/bash
echo "Building dist files..."
mkdir -p dist
rm -rf dist/*
cp server.js package.json bower.json dist/

cp -R node_modules/ dist/
cp -R data/ dist/
cp -R init/ dist/
cp -R models/ dist/
cp -R public/ dist/
rm -R dist/public/vendor/
rm dist/public/stylesheets/main.css
cp -R routes/ dist/
cp -R utils/ dist/
cp -R views/ dist/