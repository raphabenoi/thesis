"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var convector_1 = require("../convector");
var energymarket_cc_1 = require("energymarket-cc");
var router = express_1.Router();
router.post('/market', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, id, gridBuyPrice, gridSellPrice, marketToCreate, err_1;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, gridBuyPrice = _a.gridBuyPrice, gridSellPrice = _a.gridSellPrice;
                marketToCreate = new energymarket_cc_1.Market({ id: id, gridBuyPrice: gridBuyPrice, gridSellPrice: gridSellPrice });
                return [4, convector_1.EnergymarketControllerBackEnd.createMarket(marketToCreate)];
            case 1:
                _b.sent();
                res.status(201).send();
                return [3, 3];
            case 2:
                err_1 = _b.sent();
                console.log(JSON.stringify(err_1));
                res.status(500).send(err_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/market', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var marketArray, marketToReturn, err_2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, convector_1.EnergymarketControllerBackEnd.getAllMarkets()];
            case 1:
                marketArray = _a.sent();
                marketToReturn = new energymarket_cc_1.Market(marketArray[0]);
                res.send(marketToReturn.toJSON());
                return [3, 3];
            case 2:
                err_2 = _a.sent();
                console.log(JSON.stringify(err_2));
                res.status(500).send(err_2);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/grid', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, id, gridBuyPrice, gridSellPrice, gridToCreate, err_3;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, gridBuyPrice = _a.gridBuyPrice, gridSellPrice = _a.gridSellPrice;
                gridToCreate = new energymarket_cc_1.Grid({ id: id, gridBuyPrice: gridBuyPrice, gridSellPrice: gridSellPrice });
                return [4, convector_1.EnergymarketControllerBackEnd.createGrid(gridToCreate)];
            case 1:
                _b.sent();
                res.status(201).send();
                return [3, 3];
            case 2:
                err_3 = _b.sent();
                console.log(JSON.stringify(err_3));
                res.status(500).send(err_3);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/grid', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var gridArray, gridToReturn, err_4;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, convector_1.EnergymarketControllerBackEnd.getAllGrids()];
            case 1:
                gridArray = _a.sent();
                gridToReturn = new energymarket_cc_1.Grid(gridArray[0]);
                res.send(gridToReturn.toJSON());
                return [3, 3];
            case 2:
                err_4 = _a.sent();
                console.log(JSON.stringify(err_4));
                res.status(500).send(err_4);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/auction', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, id, start, end, auctionToCreate, err_5;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, start = _a.start, end = _a.end;
                auctionToCreate = new energymarket_cc_1.Auction({ id: id, start: start, end: end });
                return [4, convector_1.EnergymarketControllerBackEnd.createAuction(auctionToCreate)];
            case 1:
                _b.sent();
                res.status(201).send();
                return [3, 3];
            case 2:
                err_5 = _b.sent();
                console.log(JSON.stringify(err_5));
                res.status(500).send(err_5);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/auction/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var id, auctionToReturn, err_6;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id.id;
                return [4, convector_1.EnergymarketControllerBackEnd.getAuctionById(id)];
            case 1:
                auctionToReturn = _a.sent();
                res.send(auctionToReturn.toJSON());
                return [3, 3];
            case 2:
                err_6 = _a.sent();
                console.log(JSON.stringify(err_6));
                res.status(500).send(err_6);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/auction', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var auctionsToReturn, err_7;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, convector_1.EnergymarketControllerBackEnd.getAllAuctions()];
            case 1:
                auctionsToReturn = _a.sent();
                res.send(JSON.stringify(auctionsToReturn));
                return [3, 3];
            case 2:
                err_7 = _a.sent();
                console.log(JSON.stringify(err_7));
                res.status(500).send(err_7);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/marketParticipant', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, id, name, is, coinBalance, energyBalance, marketParticipantToCreate, err_8;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, name = _a.name, is = _a.is, coinBalance = _a.coinBalance, energyBalance = _a.energyBalance;
                if (is == "consumer") {
                    is = energymarket_cc_1.ParticipantType.consumer;
                }
                else if (is == "producer") {
                    is = energymarket_cc_1.ParticipantType.producer;
                }
                else if (is == "prosumer") {
                    is = energymarket_cc_1.ParticipantType.prosumer;
                }
                else {
                    throw new Error("participant type could not be processed correctly");
                }
                marketParticipantToCreate = new energymarket_cc_1.MarketParticipant({ id: id, name: name, is: is, coinBalance: coinBalance, energyBalance: energyBalance });
                return [4, convector_1.EnergymarketControllerBackEnd.createMarketParticipant(marketParticipantToCreate)];
            case 1:
                _b.sent();
                res.status(201).send();
                return [3, 3];
            case 2:
                err_8 = _b.sent();
                console.log(JSON.stringify(err_8));
                res.status(500).send(err_8);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/marketParticipant/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var id, marketParticipantToReturn, err_9;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id.id;
                return [4, convector_1.EnergymarketControllerBackEnd.getMarketParticipantById(id)];
            case 1:
                marketParticipantToReturn = _a.sent();
                res.send(marketParticipantToReturn.toJSON());
                return [3, 3];
            case 2:
                err_9 = _a.sent();
                console.log(JSON.stringify(err_9));
                res.status(500).send(err_9);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/marketParticipant', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var marketParticipantsToReturn, err_10;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, convector_1.EnergymarketControllerBackEnd.getAllMarketParticipants()];
            case 1:
                marketParticipantsToReturn = _a.sent();
                res.send(JSON.stringify(marketParticipantsToReturn));
                return [3, 3];
            case 2:
                err_10 = _a.sent();
                console.log(JSON.stringify(err_10));
                res.status(500).send(err_10);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/bid', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, id, auctionId, amount, price, sender, bid, err_11;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, auctionId = _a.auctionId, amount = _a.amount, price = _a.price, sender = _a.sender;
                bid = new energymarket_cc_1.FullBid({ id: id, auctionId: auctionId, amount: amount, price: price, sender: sender });
                return [4, convector_1.EnergymarketControllerBackEnd
                        .$config({ transient: { bid: bid.toJSON() } })
                        .placeBid()];
            case 1:
                _b.sent();
                res.status(201).send();
                return [3, 3];
            case 2:
                err_11 = _b.sent();
                console.log(JSON.stringify(err_11));
                res.status(500).send(err_11);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/bid/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var id, bidToReturn, err_12;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4, convector_1.EnergymarketControllerBackEnd.getBidById(id)];
            case 1:
                bidToReturn = _a.sent();
                res.send(bidToReturn.toJSON());
                return [3, 3];
            case 2:
                err_12 = _a.sent();
                console.log(JSON.stringify(err_12));
                res.status(500).send(err_12);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/bid/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var auctionId, bidsToReturn, err_13;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                auctionId = req.params.auctionId;
                return [4, convector_1.EnergymarketControllerBackEnd.getBidsByAuctionId(auctionId)];
            case 1:
                bidsToReturn = _a.sent();
                res.send(JSON.stringify(bidsToReturn));
                return [3, 3];
            case 2:
                err_13 = _a.sent();
                console.log(JSON.stringify(err_13));
                res.status(500).send(err_13);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/bid', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var bidsToReturn, err_14;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, convector_1.EnergymarketControllerBackEnd.getAllBids()];
            case 1:
                bidsToReturn = _a.sent();
                res.send(JSON.stringify(bidsToReturn));
                return [3, 3];
            case 2:
                err_14 = _a.sent();
                console.log(JSON.stringify(err_14));
                res.status(500).send(err_14);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/ask', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, id, auctionId, amount, price, sender, ask, err_15;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, auctionId = _a.auctionId, amount = _a.amount, price = _a.price, sender = _a.sender;
                ask = new energymarket_cc_1.FullAsk({ id: id, auctionId: auctionId, amount: amount, price: price, sender: sender });
                return [4, convector_1.EnergymarketControllerBackEnd
                        .$config({ transient: { ask: ask.toJSON() } })
                        .placeAsk()];
            case 1:
                _b.sent();
                res.status(201).send();
                return [3, 3];
            case 2:
                err_15 = _b.sent();
                console.log(JSON.stringify(err_15));
                res.status(500).send(err_15);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/ask/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var id, askToReturn, err_16;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4, convector_1.EnergymarketControllerBackEnd.getAskById(id)];
            case 1:
                askToReturn = _a.sent();
                res.send(askToReturn.toJSON());
                return [3, 3];
            case 2:
                err_16 = _a.sent();
                console.log(JSON.stringify(err_16));
                res.status(500).send(err_16);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/ask/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var auctionId, asksToReturn, err_17;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                auctionId = req.params.auctionId;
                return [4, convector_1.EnergymarketControllerBackEnd.getAsksByAuctionId(auctionId)];
            case 1:
                asksToReturn = _a.sent();
                res.send(JSON.stringify(asksToReturn));
                return [3, 3];
            case 2:
                err_17 = _a.sent();
                console.log(JSON.stringify(err_17));
                res.status(500).send(err_17);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/ask', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var asksToReturn, err_18;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, convector_1.EnergymarketControllerBackEnd.getAllAsks()];
            case 1:
                asksToReturn = _a.sent();
                res.send(JSON.stringify(asksToReturn));
                return [3, 3];
            case 2:
                err_18 = _a.sent();
                console.log(JSON.stringify(err_18));
                res.status(500).send(err_18);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/clearAuction/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var auctionId, clearedAuction, err_19;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                auctionId = req.params.auctionId;
                return [4, convector_1.EnergymarketControllerBackEnd.clearAuction(auctionId)];
            case 1:
                clearedAuction = _a.sent();
                res.status(201).send(clearedAuction.toJSON());
                return [3, 3];
            case 2:
                err_19 = _a.sent();
                console.log(JSON.stringify(err_19));
                res.status(500).send(err_19);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/smartMeter/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var participantId, _a, auctionPeriod, consumed, produced, reading, participantWithReading, err_20;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                participantId = req.params.participantId;
                _a = req.body, auctionPeriod = _a.auctionPeriod, consumed = _a.consumed, produced = _a.produced;
                reading = new energymarket_cc_1.SmartMeterReading({ auctionPeriod: auctionPeriod, consumed: consumed, produced: produced });
                return [4, convector_1.EnergymarketControllerBackEnd.sendReading(reading, participantId)];
            case 1:
                participantWithReading = _b.sent();
                res.status(201).send(participantWithReading.toJSON());
                return [3, 3];
            case 2:
                err_20 = _b.sent();
                console.log(JSON.stringify(err_20));
                res.status(500).send(err_20);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/clearAuction/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var auctionId, escrowedAuction, err_21;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                auctionId = req.params.auctionId;
                return [4, convector_1.EnergymarketControllerBackEnd.escrowAuction(auctionId)];
            case 1:
                escrowedAuction = _a.sent();
                res.status(201).send(JSON.stringify(escrowedAuction));
                return [3, 3];
            case 2:
                err_21 = _a.sent();
                console.log(JSON.stringify(err_21));
                res.status(500).send(err_21);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
exports.EnergymarketExpressController = router;
//# sourceMappingURL=energymarket.controller.js.map