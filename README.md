# dapr microservices

![Build Status](https://github.com/trumhemcut/dapr-microservices/workflows/simplads-api/badge.svg) ![Build Status](https://github.com/trumhemcut/dapr-microservices/workflows/simplads-vue/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Follow on Twitter](https://img.shields.io/twitter/follow/trumhemcut.svg?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=trumhemcut)

Leverage the power of Dapr to build microservices application

## Get started

### Step 1 - Pre-requisites

- Kubernetes, it's ok to use Kubernetes on Docker for Win/Mac or Minikube for development environment. Currently I've just tested on Docker for Win/Mac environment (with Kubernetes enabled). Minikube hasn't been tested yet!
- [Helm 3.0](https://github.com/helm/helm/releases), no more Tiller. But please add the repo before we can install:
- [Dapr CLI](https://github.com/dapr/cli), prefer latest version (e.g. 0.3.0)

### Step 2 - Setup

First, initialize Dapr on Kubernetes so that it can inject sidecars to our applications:

```
$ dapr init --kubernetes
```

Next, clone the source code & install the SimplAds app via Helm:

```
$ git clone https://github.com/trumhemcut/dapr-microservices.git
$ cd dapr-microservices
$ helm dep up ./helm-chart
$ helm install simplads ./helm-chart

```

### Step 3 - Change your host file

Since the SimplAds uses Traefik as its main ingress, and using hostnames as the main endpoints. Please add those following hostnames to your host files:

If you're using Mac, add the line below to this file _/etc/hosts_. If you're using Windows, add the line below to this file _C:\Windows\System32\drivers\hosts_

```
127.0.0.1   dapr.fun dashboard.dapr.fun web.dapr.fun api.dapr.fun zipkin.dapr.fun traefik.dapr.fun
```

## Features

After finishing all above steps (it may takes several minutes), you can browse following Urls:

- Web App: http://web.dapr.fun
- Distrubuted tracing: http://zipkin.dapr.fun
- Traefik Ingress: http://traefik.dapr.fun
- Dapr Dashboard: http://dashboard.dapr.fun
- Dapr API endpoint: http://api.dapr.fun

## Architecture

TODO
