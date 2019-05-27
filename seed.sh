## ADD SCRIPT HERE

npm start
hurl invoke energymarket energymarket_createMarket "{\"id\":\"MKT\",\"auctionTime\":900000,\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org1 -u admin
#npm run test

hurl invoke energymarket energymarket_createMarket "{\"id\":\"MKT\",\"auctionTime\":900000,\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org1 -u admin
hurl invoke energymarket energymarket_createGrid "{\"id\":\"GRID\",\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org2 -u user1

hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"LMO\",\"is\":\"lmo\"}" -o org1 -u user1
hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"PAR_org3\",\"is\":\"prosumer\"}" -o org3 -u user1
hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"PAR_org4\",\"is\":\"prosumer\"}" -o org4 -u user1

hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC1\",\"start\":1554113325000,\"end\":1554123325000}" -o org1 -u user1
hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC2\",\"start\":1554123325001,\"end\":1554133325000}" -o org1 -u user1
hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC3\",\"start\":1554133325001,\"end\":1554143325000}" -o org1 -u user1

export BID1=$(echo -n "{\"id\":\"BID_AUC1_org3\",\"auctionId\":\"AUC1\",\"amount\":50,\"price\":15,\"sender\":\"PAR_org3\"}" | base64)
hurl invoke energymarket energymarket_placeBid -t "{\"bid\":\"$BID1\"}" -o org3 -u user1

export BID2=$(echo -n "{\"id\":\"BID_AUC1_org4\",\"auctionId\":\"AUC1\",\"amount\":100,\"price\":18,\"sender\":\"PAR_org4\"}" | base64)
hurl invoke energymarket energymarket_placeBid -t "{\"bid\":\"$BID2\"}" -o org4 -u user1

export ASK1=$(echo -n "{\"id\":\"ASK_AUC1_org3\",\"auctionId\":\"AUC1\",\"amount\":80,\"price\":14,\"sender\":\"PAR_org3\"}" | base64)
hurl invoke energymarket energymarket_placeAsk -t "{\"ask\":\"$ASK1\"}" -o org3 -u user1

export ASK2=$(echo -n "{\"id\":\"ASK_AUC1_org4\",\"auctionId\":\"AUC1\",\"amount\":70,\"price\":12,\"sender\":\"PAR_org4\"}" | base64)
hurl invoke energymarket energymarket_placeAsk -t "{\"ask\":\"$ASK2\"}" -o org4 -u user1

hurl invoke energymarket energymarket_clearAuction "AUC1" -o org1 -u user1

hurl invoke energymarket energymarket_sendReading "{\"id\":\"READ1\",\"auctionPeriod\":\"AUC1\",\"consumed\":55,\"produced\":100}" -o org3 -u user1
hurl invoke energymarket energymarket_sendReading "{\"id\":\"READ2\",\"auctionPeriod\":\"AUC1\",\"consumed\":120,\"produced\":60}" -o org4 -u user1

hurl invoke energymarket energymarket_getAllMarketParticipants -o org1 -u user1
hurl invoke energymarket energymarket_escrowAuction "AUC1" -o org1 -u user1