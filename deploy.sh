#! /bin/bash
helm uninstall simplads
echo -e 'Waiting in 8 seconds for deleting helm...'
sleep 8

# Clean the remaining dependencies
kubectl delete deploy $(kubectl get deploy | grep simplads | awk '{print $1}')
kubectl delete svc $(kubectl get svc | grep simplads | awk '{print $1}')
kubectl delete configmap $(kubectl get configmap | grep simplads | awk '{print $1}')
kubectl delete component zipkin
kubectl delete configuration tracing
kubectl delete serviceaccount simplads-simplads-chart keda-operator
kubectl delete clusterrole deployment-reader keda-operator-external-metrics-reader keda-operator
kubectl delete clusterrolebinding deployment-reader-global keda-operator:system:auth-delegator keda-operator keda-operator-hpa-controller-external-metrics
kubectl delete RoleBinding  keda-operator-auth-reader -n kube-system
kubectl delete svc keda-operator
kubectl delete deploy keda-operator
kubectl delete ingress simplads-traefik-dashboard simplads-ingress
kubectl delete apiservice v1beta1.external.metrics.k8s.io v1beta1.custom.metrics.k8s.io

# docker rmi $(docker images | grep simplads | awk '{print $3}') --force
cd simplads-api
docker build -t trumhemcut/simplads_api .
cd .. && cd simplads-vue
docker build -t trumhemcut/simplads_vue .
cd .. && cd simplads-resize
docker build -t trumhemcut/simplads_resize .
cd ..
helm install simplads ./helm-chart