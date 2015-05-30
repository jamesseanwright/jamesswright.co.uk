#! /bin/bash
echo "Building dist files..."
rm -rf dist/*
cd dist
git init
cd ..

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

cd dist
git add -A
git commit -m "Release"
cd ..