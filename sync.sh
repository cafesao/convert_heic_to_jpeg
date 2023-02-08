echo 'Build...'
yarn build
echo 'Build complete!'
echo 'Init sync...'
aws s3 sync ./dist s3://convert.cafesao.net --region sa-east-1
echo 'Sync end!'