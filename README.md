# dapr-microservices

Leverage the power of Dapr to build microservices application

## Get started

### Step 1 - Pre-requisites

- Kubernetes
- Helm 3.0
- Dapr CLI

### Step 2 - Setup

First, initial the project using Dapr on Kubernetes:

```
$ dapr init --kubernetes
```

Next, clone the source code & install the SimplAds app.

```
$ git clone https://github.com/trumhemcut/dapr-on-azure.git
$ cd dapr-on-azure/helm-chart
$ helm dep up
$ cd ..
$ helm install simplads ./helm-chart

```

### Step 3 - Change your host file

Since the SimplAds use Traefik as its main ingress, and using hostnames as the main endpoints. Please add those following hostnames to your host files:

If you're using Mac, add the line below to this file _/etc/hosts_

```
127.0.0.1   dapr.fun dashboard.dapr.fun web.dapr.fun api.dapr.fun zipkin.dapr.fun
```

## Features

After finishing all above steps (it may takes several minutes), you can browse following Urls:

- Web App: http://web.dapr.fun
- Distrubuted tracing: http://zipkin.dapr.fun
- Traefik Ingress: http://dashboard.dapr.fun
- Dapr API endpoint: http://api.dapr.fun

## Architecture

TODO
