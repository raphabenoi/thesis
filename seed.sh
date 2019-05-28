## ADD SCRIPT HERE

# npm start
# npm run test

echo "Creating a MARKET instance"
hurl invoke energymarket energymarket_createMarket "{\"id\":\"MKT\",\"auctionTime\":900000,\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org1 -u user1

echo "Registering the GRID instance as ORG 2"
hurl invoke energymarket energymarket_createGrid "{\"id\":\"GRID\",\"gridBuyPrice\":25,\"gridSellPrice\":5}" -o org2 -u user1

echo "Registering the LMO instance as ORG 1"
hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"LMO\",\"is\":\"lmo\"}" -o org1 -u user1
echo "Registering market participant 'PAR_org3'  as ORG 3"
hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"PAR_org3\",\"is\":\"prosumer\"}" -o org3 -u user1
echo "Registering market participant 'PAR_org4'  as ORG 4"
hurl invoke energymarket energymarket_createMarketParticipant "{\"id\":\"PAR_org4\",\"is\":\"prosumer\"}" -o org4 -u user1

echo "Creating 'AUC1' as ORG 1"
hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC1\",\"start\":1554113325000,\"end\":1554123325000}" -o org1 -u user1
echo "Creating 'AUC2' as ORG 1"
hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC2\",\"start\":1554123325001,\"end\":1554133325000}" -o org1 -u user1
echo "Creating 'AUC3' as ORG 1"
hurl invoke energymarket energymarket_createAuction "{\"id\":\"AUC3\",\"start\":1554133325001,\"end\":1554143325000}" -o org1 -u user1


####### ROUND 1 ###########
echo "Building 'BID1' transient input data"
export BID1=$(echo -n "{\"id\":\"BID_AUC1_org3\",\"auctionId\":\"AUC1\",\"amount\":50,\"price\":15,\"sender\":\"PAR_org3\"}" | base64)
echo "Invoking placeBid transaction as ORG 3"
hurl invoke energymarket energymarket_placeBid -t "{\"bid\":\"$BID1\"}" -o org3 -u user1

echo "Building 'BID2' transient input data"
export BID2=$(echo -n "{\"id\":\"BID_AUC1_org4\",\"auctionId\":\"AUC1\",\"amount\":100,\"price\":18,\"sender\":\"PAR_org4\"}" | base64)
echo "Invoking placeBid transaction as ORG 4"
hurl invoke energymarket energymarket_placeBid -t "{\"bid\":\"$BID2\"}" -o org4 -u user1

echo "Building 'ASK1' transient input data"
export ASK1=$(echo -n "{\"id\":\"ASK_AUC1_org3\",\"auctionId\":\"AUC1\",\"amount\":80,\"price\":14,\"sender\":\"PAR_org3\"}" | base64)
echo "Invoking placeAsk transaction as ORG 3"
hurl invoke energymarket energymarket_placeAsk -t "{\"ask\":\"$ASK1\"}" -o org3 -u user1

echo "Building 'ASK2' transient input data"
export ASK2=$(echo -n "{\"id\":\"ASK_AUC1_org4\",\"auctionId\":\"AUC1\",\"amount\":70,\"price\":12,\"sender\":\"PAR_org4\"}" | base64)
echo "Invoking placeAsk transaction as ORG 4"
hurl invoke energymarket energymarket_placeAsk -t "{\"ask\":\"$ASK2\"}" -o org4 -u user1

echo "Building 'BIDS' ... an array of bidPrivateDetails as transient input data for the clearAuction transaction"
export BIDS=$(echo -n "[{\"id\":\"BID_AUC1_org3\",\"amount\":50,\"price\":15},{\"id\":\"BID_AUC1_org4\",\"amount\":100,\"price\":18}]" | base64)
echo "Building 'ASKS' ... an array of askPrivateDetails as transient input data for the clearAuction transaction"
export ASKS=$(echo -n "[{\"id\":\"ASK_AUC1_org3\",\"amount\":80,\"price\":14},{\"id\":\"ASK_AUC1_org4\",\"amount\":70,\"price\":12}]" | base64)
echo "Invoking the clearAuction transaction on AUC1 as ORG 1"
hurl invoke energymarket energymarket_clearAuction "AUC1" -t "{\"bids\":\"$BIDS\",\"asks\":\"$ASKS\"}" -o org1 -u user1

####### ROUND 2 ###########
echo "Building 'BID3' transient input data"
export BID3=$(echo -n "{\"id\":\"BID_AUC2_org3\",\"auctionId\":\"AUC2\",\"amount\":50,\"price\":15,\"sender\":\"PAR_org3\"}" | base64)
echo "Invoking placeBid transaction as ORG 3"
hurl invoke energymarket energymarket_placeBid -t "{\"bid\":\"$BID3\"}" -o org3 -u user1

echo "Building 'BID4' transient input data"
export BID4=$(echo -n "{\"id\":\"BID_AUC2_org4\",\"auctionId\":\"AUC2\",\"amount\":110,\"price\":18,\"sender\":\"PAR_org4\"}" | base64)
echo "Invoking placeBid transaction as ORG 4"
hurl invoke energymarket energymarket_placeBid -t "{\"bid\":\"$BID4\"}" -o org4 -u user1

echo "Building 'ASK3' transient input data"
export ASK3=$(echo -n "{\"id\":\"ASK_AUC2_org3\",\"auctionId\":\"AUC2\",\"amount\":80,\"price\":14,\"sender\":\"PAR_org3\"}" | base64)
echo "Invoking placeAsk transaction as ORG 3"
hurl invoke energymarket energymarket_placeAsk -t "{\"ask\":\"$ASK3\"}" -o org3 -u user1

echo "Building 'ASK4' transient input data"
export ASK4=$(echo -n "{\"id\":\"ASK_AUC2_org4\",\"auctionId\":\"AUC2\",\"amount\":70,\"price\":12,\"sender\":\"PAR_org4\"}" | base64)
echo "Invoking placeAsk transaction as ORG 4"
hurl invoke energymarket energymarket_placeAsk -t "{\"ask\":\"$ASK4\"}" -o org4 -u user1

echo "Building 'BIDS' ... an array of bidPrivateDetails as transient input data for the clearAuction transaction"
export BIDS=$(echo -n "[{\"id\":\"BID_AUC2_org3\",\"amount\":50,\"price\":15},{\"id\":\"BID_AUC2_org4\",\"amount\":110,\"price\":18}]" | base64)
echo "Building 'ASKS' ... an array of askPrivateDetails as transient input data for the clearAuction transaction"
export ASKS=$(echo -n "[{\"id\":\"ASK_AUC2_org3\",\"amount\":80,\"price\":14},{\"id\":\"ASK_AUC2_org4\",\"amount\":70,\"price\":12}]" | base64)
echo "Invoking the clearAuction transaction on AUC2 as ORG 1"
hurl invoke energymarket energymarket_clearAuction "AUC2" -t "{\"bids\":\"$BIDS\",\"asks\":\"$ASKS\"}" -o org1 -u user1


####### ROUND 3 ###########
echo "Building 'BID5' transient input data"
export BID5=$(echo -n "{\"id\":\"BID_AUC3_org3\",\"auctionId\":\"AUC3\",\"amount\":50,\"price\":15,\"sender\":\"PAR_org3\"}" | base64)
echo "Invoking placeBid transaction as ORG 3"
hurl invoke energymarket energymarket_placeBid -t "{\"bid\":\"$BID5\"}" -o org3 -u user1

echo "Building 'BID6' transient input data"
export BID6=$(echo -n "{\"id\":\"BID_AUC3_org4\",\"auctionId\":\"AUC3\",\"amount\":110,\"price\":18,\"sender\":\"PAR_org4\"}" | base64)
echo "Invoking placeBid transaction as ORG 4"
hurl invoke energymarket energymarket_placeBid -t "{\"bid\":\"$BID6\"}" -o org4 -u user1

echo "Building 'ASK5' transient input data"
export ASK5=$(echo -n "{\"id\":\"ASK_AUC3_org3\",\"auctionId\":\"AUC3\",\"amount\":180,\"price\":14,\"sender\":\"PAR_org3\"}" | base64)
echo "Invoking placeAsk transaction as ORG 3"
hurl invoke energymarket energymarket_placeAsk -t "{\"ask\":\"$ASK5\"}" -o org3 -u user1

echo "Building 'ASK6' transient input data"
export ASK6=$(echo -n "{\"id\":\"ASK_AUC3_org4\",\"auctionId\":\"AUC3\",\"amount\":70,\"price\":12,\"sender\":\"PAR_org4\"}" | base64)
echo "Invoking placeAsk transaction as ORG 4"
hurl invoke energymarket energymarket_placeAsk -t "{\"ask\":\"$ASK6\"}" -o org4 -u user1

echo "Building 'BIDS' ... an array of bidPrivateDetails as transient input data for the clearAuction transaction"
export BIDS=$(echo -n "[{\"id\":\"BID_AUC3_org3\",\"amount\":50,\"price\":15},{\"id\":\"BID_AUC3_org4\",\"amount\":110,\"price\":18}]" | base64)
echo "Building 'ASKS' ... an array of askPrivateDetails as transient input data for the clearAuction transaction"
export ASKS=$(echo -n "[{\"id\":\"ASK_AUC3_org3\",\"amount\":180,\"price\":14},{\"id\":\"ASK_AUC3_org4\",\"amount\":70,\"price\":12}]" | base64)
echo "Invoking the clearAuction transaction on AUC3 as ORG 1"
hurl invoke energymarket energymarket_clearAuction "AUC3" -t "{\"bids\":\"$BIDS\",\"asks\":\"$ASKS\"}" -o org1 -u user1


# hurl invoke energymarket energymarket_sendReading "{\"id\":\"READ1\",\"auctionPeriod\":\"AUC1\",\"consumed\":55,\"produced\":100}" -o org3 -u user1
# hurl invoke energymarket energymarket_sendReading "{\"id\":\"READ2\",\"auctionPeriod\":\"AUC1\",\"consumed\":120,\"produced\":60}" -o org4 -u user1

# hurl invoke energymarket energymarket_getAllMarketParticipants -o org1 -u user1
# hurl invoke energymarket energymarket_escrowAuction "AUC1" -o org1 -u user1