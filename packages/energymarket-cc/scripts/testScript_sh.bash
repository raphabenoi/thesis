#!/bin/bash
#init
cd ../../../
lerna clean
rm -rf node_modules
rm package-lock.json
npm i
npm run env:restart
npm run cc:start -- energymarket  1
sleep 10
conv-rest-api generate api -c energymarket -p hypenergy -f ./org1.energymarket.config.json
npx lerna run compile --scope energymarket-app
npx lerna run start --scope energymarket-app --stream

# npm run cc:invoke -- energymarket org1 user1 energymarket createMarket '{"id":"MKT","auctionTime":900000,"gridBuyPrice":28,"gridSellPrice":13}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createAuction '{"id":"AUC1","start":1554113325000,"end":2554113325000}'

# npm run cc:invoke -- energymarket org1 user1 energymarket createSupplier '{"id":"SPL_2","name":"supplier2","rawMaterialAvailable":3000}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createManufacturer '{"id":"MNF_1","name":"manufacturer1","productsAvailable":0,"rawMaterialAvailable":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createManufacturer '{"id":"MNF_2","name":"manufacturer2","rawMaterialAvailable":0,"productsAvailable":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createDistributor '{"id":"DST_1","name":"distributor1","productsToBeShipped":0,"productsShipped":0,"productsReceived":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createDistributor '{"id":"DST_2","name":"distributor2","productsToBeShipped":0,"productsShipped":0,"productsReceived":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createRetailer '{"id":"RTL_1","name":"retailer1","productsOrdered":0,"productsAvailable":0,"productsSold":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createRetailer '{"id":"RTL_2","name":"retailer2","productsOrdered":0,"productsAvailable":0,"productsSold":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createCustomer '{"id":"CST_1","name":"luca","productsBought":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createCustomer '{"id":"CST_2","name":"diestrin","productsBought":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createCustomer '{"id":"CST_3","name":"waltermontes","productsBought":0}'
# npm run cc:invoke -- energymarket org1 user1 energymarket fetchRawMaterial SPL_1 1000 #so SPL_1 is 3000
# npm run cc:invoke -- energymarket org1 user1 energymarket fetchRawMaterial SPL_2 2000 #so SPL_2 is 5000
# npm run cc:invoke -- energymarket org1 user1 energymarket getRawMaterialFromSupplier MNF_1 SPL_1 500
# npm run cc:invoke -- energymarket org1 user1 energymarket getRawMaterialFromSupplier MNF_1 SPL_2 50
# npm run cc:invoke -- energymarket org1 user1 energymarket getRawMaterialFromSupplier MNF_2 SPL_1 200
# npm run cc:invoke -- energymarket org1 user1 energymarket getRawMaterialFromSupplier MNF_2 SPL_2 100 # alla fine ci aspettiamo SPL_1:2300, MNF_1 550, SPL_2:4850 MNF_2:300
# npm run cc:invoke -- energymarket org1 user1 energymarket createProducts MNF_1 25 10
# npm run cc:invoke -- energymarket org1 user1 energymarket createProducts MNF_2 10 50
# npm run cc:invoke -- energymarket org1 user1 energymarket sendProductsToDistribution MNF_1 DST_1 5
# npm run cc:invoke -- energymarket org1 user1 energymarket sendProductsToDistribution MNF_1 DST_2 3
# npm run cc:invoke -- energymarket org1 user1 energymarket sendProductsToDistribution MNF_2 DST_1 6 # DST_1: 11, DST_2: 3
# npm run cc:invoke -- energymarket org1 user1 energymarket orderProductsFromDistributor RTL_1 DST_1 5
# npm run cc:invoke -- energymarket org1 user1 energymarket orderProductsFromDistributor RTL_1 DST_2 1
# npm run cc:invoke -- energymarket org1 user1 energymarket orderProductsFromDistributor RTL_2 DST_2 2
# npm run cc:invoke -- energymarket org1 user1 energymarket receiveProductsFromDistributor RTL_1 DST_1 5
# npm run cc:invoke -- energymarket org1 user1 energymarket receiveProductsFromDistributor RTL_1 DST_2 1
# npm run cc:invoke -- energymarket org1 user1 energymarket receiveProductsFromDistributor RTL_2 DST_2 2
# npm run cc:invoke -- energymarket org1 user1 energymarket buyProductsFromRetailer RTL_1 CST_1 2
# npm run cc:invoke -- energymarket org1 user1 energymarket buyProductsFromRetailer RTL_2 CST_2 2
# npm run cc:invoke -- energymarket org1 user1 energymarket buyProductsFromRetailer RTL_1 CST_2 2

# npm run cc:invoke -- energymarket org1 user1 energymarket getAllModels

#cd packages/supplychain-app
#npx lerna run compile --scope supplychain-app
#npx lerna run dev --scope supplychain-app --stream

#docker logs $(docker ps -qa | head -n 1) -f
