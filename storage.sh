resourceGrp=maglin-cli-resource-grp
storageAcc=maglinclistorage
location=westeurope
az group create --location $location --name resourceGrp
az storage account create --location $location --name $storageAcc --resource-group $resourceGrp --sku Standard_LRS
az storage container create -n images --public-access blob --account-name $storageAcc --auth-mode login
blobEndpoint=$(az storage account show --name maglinclistorage --resource-group maglin-cli-resource-grp --query primaryEndpoints.blob --output tsv)
echo "My blob endpoint is" $blobEndpoint