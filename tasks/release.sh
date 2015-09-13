#!/bin/bash
echo "Building dist files..."

if [ -e dist/ ]
then
	rm -rf dist/
fi

heroku git:clone -a james-wright-prod
mv james-wright-prod dist

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
git push heroku master
cd ..