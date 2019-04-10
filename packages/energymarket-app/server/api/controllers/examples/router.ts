import express from 'express';
import controller from './controller'
export default express.Router()

    .post('/marketParticipants/', controller.energymarket_createMarketParticipant)
    .post('/auctions/', controller.energymarket_createAuction)
    .post('/markets/', controller.energymarket_createMarket)
    .post('/grids/', controller.energymarket_createGrid)
    .post('/bids/', controller.energymarket_placeBid)
    .post('/asks/', controller.energymarket_placeAsk)
    .get('/marketParticipants/', controller.energymarket_getAllMarketParticipants)
    .get('/auctions/', controller.energymarket_getAllAuctions)
    .get('/markets/', controller.energymarket_getAllMarkets)
    .get('/grids/', controller.energymarket_getAllGrids)
    .get('/bids/', controller.energymarket_getAllBids)
    .get('/asks/', controller.energymarket_getAllAsks)
    .get('/marketParticipants/:id', controller.energymarket_getMarketParticipantById)
    .get('/auctions/:id', controller.energymarket_getAuctionById)
    .get('/bids/:id', controller.energymarket_getBidById)
    .get('/asks/:id', controller.energymarket_getAskById)
    .post('/getBidsByAuctionId', controller.energymarket_getBidsByAuctionId)
    .post('/getAsksByAuctionId', controller.energymarket_getAsksByAuctionId)
    .post('/sendReading', controller.energymarket_sendReading)
    .post('/clearAuction', controller.energymarket_clearAuction)
    .post('/escrowAuction', controller.energymarket_escrowAuction)
    .post('/buyFromGrid', controller.energymarket_buyFromGrid)
    .post('/transferCoins', controller.energymarket_transferCoins)

;
