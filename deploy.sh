#! /bin/bash
helm uninstall simplads
echo -e 'Waiting in 5 seconds for deleting helm...'
sleep 5
docker rmi $(docker images | grep simplads | awk '{print $3}') --force
cd simplads-api
docker build -t trumhemcut/simplads_api .
cd .. && cd simplads-vue
docker build -t trumhemcut/simplads_vue .
cd ..
helm install simplads ./helm-chart