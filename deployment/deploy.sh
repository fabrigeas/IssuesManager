#!/usr/bin/env sh

npm run build
git add --all
git commit -am "deploy"
git push origin master
cp -r ../build/* ../../backend/public
#ssh -i "aws-instance-keypair-2.pem" ec2-user@ec2-54-93-50-24.eu-central-1.compute.amazonaws.com ./deploy.sh
cd ../../backend/deployment

sh deploy.sh