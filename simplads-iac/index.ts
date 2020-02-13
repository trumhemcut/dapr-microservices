import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as azuread from '@pulumi/azuread'
import * as kubernetes from '@pulumi/kubernetes'
import * as config from './config'

// Create application principal
const adApp = new azuread.Application("aks");
const adSp = new azuread.ServicePrincipal("aksServicePrincipal", {
  applicationId: adApp.applicationId
});
const adSpPassword = new azuread.ServicePrincipalPassword("aksSpPassword", {
  servicePrincipalId: adSp.id,
  value: "Hello",
  endDate: "2099-01-01T00:00:00Z",
});

// Now allocate an AKS cluster.
export const k8sCluster = new azure.containerservice.KubernetesCluster("aksCluster", {
  resourceGroupName: config.resourceGroup.name,
  location: config.location,
  defaultNodePool: {
    name: "aksagentpool",
    nodeCount: config.nodeCount,
    vmSize: config.nodeSize,
  },
  dnsPrefix: `${pulumi.getStack()}-kube`,
  linuxProfile: {
    adminUsername: "aksuser",
    sshKey: {
      keyData: config.sshPublicKey,
    },
  },
  servicePrincipal: {
    clientId: adApp.applicationId,
    clientSecret: adSpPassword.value,
  },
});

// Expose a K8s provider instance using our custom cluster instance.
export const k8sProvider = new k8s.Provider("aksK8s", {
  kubeconfig: k8sCluster.kubeConfigRaw,
});

// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup("simplads-dapr");

// Create an Azure resource (Storage Account)
const account = new azure.storage.Account("storage", {
  // The location for the storage account will be derived automatically from the resource group.
  resourceGroupName: resourceGroup.name,
  accountTier: "Standard",
  accountReplicationType: "LRS",
});


// Export the connection string for the storage account
export const connectionString = account.primaryConnectionString;