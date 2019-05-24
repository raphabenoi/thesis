#!/bin/bash
#init
cd ../../../
le
hurl new -o 4
npm run cc:start -- energymarket
sleep 10
#conv-rest-api generate api -c energymarket -p hypenergy
#npx lerna run compile --scope energymarket-app
#npx lerna run start --scope energymarket-app --stream

### OLD ###
# npm run cc:invoke -- energymarket org1 user1 energymarket createMarket '{"id":"MKT","auctionTime":900000,"gridBuyPrice":28,"gridSellPrice":13}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createAuction '{"id":"AUC1","start":1554113325000,"end":2554113325000}'
# npm run cc:invoke -- energymarket org1 user1 energymarket createMarketParticipant '{"id":"PAR1", "name":"Anton", "is":"prosumer"}'


# hurl invoke energymarket energymarket_createMarket "{\"id\":\"MKT\",\"auctionTime\":900000,\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org1 -u admin
# hurl invoke energymarket energymarket_createGrid "{\"id\":\"GRID\",\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org1 -u admin

# hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"PAR1\",\"name\":\"Anton\",\"is\":\"prosumer\"}" -o org1 -u user1
# hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"PAR2\",\"name\":\"Berta\",\"is\":\"prosumer\"}" -o org2 -u user1
# hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"PAR3\",\"name\":\"Chloe\",\"is\":\"prosumer\"}" -o org3 -u user1
# hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"PAR4\",\"name\":\"Dieter\",\"is\":\"prosumer\"}" -o org4 -u user1

# hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC1\",\"start\":1554113325000,\"end\":1554123325000}" -o org1 -u admin
# hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC2\",\"start\":1554123325001,\"end\":1554133325000}" -o org1 -u admin
# hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC3\",\"start\":1554133325001,\"end\":1554143325000}" -o org1 -u admin

# hurl invoke energymarket energymarket_placeBid "{\"id\":\"BID1\",\"auctionId\":\"AUC1\",\"amount\":100,\"price\":15,\"sender\":\"PAR1\"}" -o org1 -u user1
# hurl invoke energymarket energymarket_placeAsk "{\"id\":\"ASK1\",\"auctionId\":\"AUC1\",\"amount\":110,\"price\":14,\"sender\":\"PAR2\"}" -o org2 -u user1
# hurl invoke energymarket energymarket_placeBid "{\"id\":\"BID2\",\"auctionId\":\"AUC1\",\"amount\":50,\"price\":10,\"sender\":\"PAR3\"}" -o org3 -u user1
# hurl invoke energymarket energymarket_placeAsk "{\"id\":\"ASK2\",\"auctionId\":\"AUC1\",\"amount\":60,\"price\":20,\"sender\":\"PAR4\"}" -o org4 -u user1

# hurl invoke energymarket energymarket_clearAuction "AUC1" -o org1 -u admin

# hurl invoke energymarket energymarket_sendReading "{\"id\":\"READ1\",\"auctionPeriod\":\"AUC1\",\"consumed\":105,\"produced\":0}" -o org1 -u user1
# hurl invoke energymarket energymarket_sendReading "{\"id\":\"READ2\",\"auctionPeriod\":\"AUC1\",\"consumed\":0,\"produced\":95}" -o org2 -u user1
# hurl invoke energymarket energymarket_sendReading "{\"id\":\"READ3\",\"auctionPeriod\":\"AUC1\",\"consumed\":10,\"produced\":0}" -o org3 -u user1
# hurl invoke energymarket energymarket_sendReading "{\"id\":\"READ4\",\"auctionPeriod\":\"AUC1\",\"consumed\":0,\"produced\":0}" -o org4 -u user1

# hurl invoke energymarket energymarket_getAllMarketParticipants -o org1 -u admin
# hurl invoke energymarket energymarket_escrowAuction "AUC1" -o org1 -u admin


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
