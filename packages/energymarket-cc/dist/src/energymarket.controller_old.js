"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_1 = require("@worldsibu/convector-core");
var ask_model_1 = require("./models/ask.model");
var auction_model_1 = require("./models/auction.model");
var bid_model_1 = require("./models/bid.model");
var market_model_1 = require("./models/market.model");
var marketParticipant_model_1 = require("./models/marketParticipant.model");
var convector_rest_api_decorators_1 = require("@worldsibu/convector-rest-api-decorators");
var EnergymarketController = (function (_super) {
    tslib_1.__extends(EnergymarketController, _super);
    function EnergymarketController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnergymarketController.prototype.createMarketParticipant = function (marketParticipant) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, marketParticipant.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EnergymarketController.prototype.getAllMarketParticipants = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedMarketParticipants;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, marketParticipant_model_1.MarketParticipant.getAll()];
                    case 1:
                        storedMarketParticipants = _a.sent();
                        return [2, storedMarketParticipants];
                }
            });
        });
    };
    EnergymarketController.prototype.getMarketParticipantById = function (marketParticipantId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var marketParticipant;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, marketParticipant_model_1.MarketParticipant.getOne(marketParticipantId)];
                    case 1:
                        marketParticipant = _a.sent();
                        return [2, marketParticipant];
                }
            });
        });
    };
    EnergymarketController.prototype.createAuction = function (auction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, auction.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EnergymarketController.prototype.getAllAuctions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedAuctions;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, auction_model_1.Auction.getAll()];
                    case 1:
                        storedAuctions = _a.sent();
                        return [2, storedAuctions];
                }
            });
        });
    };
    EnergymarketController.prototype.getAuctionById = function (auctionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auction;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, auction_model_1.Auction.getOne(auctionId)];
                    case 1:
                        auction = _a.sent();
                        return [2, auction];
                }
            });
        });
    };
    EnergymarketController.prototype.createMarket = function (market) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, market.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EnergymarketController.prototype.getAllMarkets = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedMarkets;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, market_model_1.Market.getAll()];
                    case 1:
                        storedMarkets = _a.sent();
                        return [2, storedMarkets];
                }
            });
        });
    };
    EnergymarketController.prototype.placeBid = function (bid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auction, txTimestamp, bidder;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, auction_model_1.Auction.getOne(bid.auctionId)];
                    case 1:
                        auction = _a.sent();
                        txTimestamp = this.tx.stub.getTxDate().getTime();
                        if (!(txTimestamp >= auction.end)) return [3, 4];
                        if (!(auction.status === 0)) return [3, 3];
                        auction.status = 1;
                        return [4, auction.save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: throw new Error("The auction is already closed and does not accept new bids");
                    case 4:
                        if (!(txTimestamp < auction.end)) return [3, 8];
                        return [4, marketParticipant_model_1.MarketParticipant.getOne(this.sender)];
                    case 5:
                        bidder = _a.sent();
                        if ((bidder.coinBalance + 1000) < (bid.amount * bid.price)) {
                            throw new Error("Bidder does not have enough coins to place this bid");
                        }
                        else {
                            bidder.coinBalance = -(bid.amount * bid.price);
                            bidder.frozenCoins += (bid.amount * bid.price);
                            bid.sender = this.sender;
                        }
                        return [4, bidder.save()];
                    case 6:
                        _a.sent();
                        return [4, bid.save()];
                    case 7:
                        _a.sent();
                        return [2, bid];
                    case 8: return [2];
                }
            });
        });
    };
    EnergymarketController.prototype.getAllBids = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedBids;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, bid_model_1.Bid.getAll()];
                    case 1:
                        storedBids = _a.sent();
                        return [2, storedBids];
                }
            });
        });
    };
    EnergymarketController.prototype.getBidById = function (bidId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bid;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, bid_model_1.Bid.getOne(bidId)];
                    case 1:
                        bid = _a.sent();
                        return [2, bid];
                }
            });
        });
    };
    EnergymarketController.prototype.getBidsByAuctionId = function (auctionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var allBids, bids;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, bid_model_1.Bid.getAll()];
                    case 1:
                        allBids = _a.sent();
                        bids = allBids.filter(function (bid) { return bid.auctionId === auctionId; });
                        return [2, bids];
                }
            });
        });
    };
    EnergymarketController.prototype.placeAsk = function (ask) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auction, txTimestamp;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, auction_model_1.Auction.getOne(ask.auctionId)];
                    case 1:
                        auction = _a.sent();
                        txTimestamp = this.tx.stub.getTxDate().getTime();
                        if (!(txTimestamp >= auction.end)) return [3, 4];
                        if (!(auction.status === 0)) return [3, 3];
                        auction.status = 1;
                        return [4, auction.save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: throw new Error("The auction is already closed and does not accept new asks");
                    case 4:
                        if (!(txTimestamp < auction.end)) return [3, 6];
                        ask.sender = this.sender;
                        return [4, ask.save()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    EnergymarketController.prototype.getAllAsks = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedAsks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ask_model_1.Ask.getAll()];
                    case 1:
                        storedAsks = _a.sent();
                        return [2, storedAsks];
                }
            });
        });
    };
    EnergymarketController.prototype.getAskById = function (askId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ask;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ask_model_1.Ask.getOne(askId)];
                    case 1:
                        ask = _a.sent();
                        return [2, ask];
                }
            });
        });
    };
    EnergymarketController.prototype.getAsksByAuctionId = function (auctionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var allAsks, asks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ask_model_1.Ask.getAll()];
                    case 1:
                        allAsks = _a.sent();
                        asks = allAsks.filter(function (ask) { return ask.auctionId === auctionId; });
                        return [2, asks];
                }
            });
        });
    };
    EnergymarketController.prototype.clearAuction = function (auctionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auction, txTimestamp, bids, asks, lowestPrice, highestPrice, demandCurve_1, supplyCurve_1, _highestPrice, i, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, auction_model_1.Auction.getOne(auctionId)];
                    case 1:
                        auction = _a.sent();
                        txTimestamp = (Date.now() + 30000000);
                        if (txTimestamp <= auction.end) {
                            throw new Error("Auction is still 'OPEN' and cannot be cleared yet. Try again once 'txTimestamp' > 'auction.end'");
                        }
                        if (!(txTimestamp > auction.end)) return [3, 4];
                        return [4, bid_model_1.Bid.query(bid_model_1.Bid, {
                                "selector": {
                                    "type": "de.rli.hypenergy.bid",
                                    "auctionId": auctionId
                                }
                            })];
                    case 2:
                        bids = (_a.sent());
                        return [4, ask_model_1.Ask.query(ask_model_1.Ask, {
                                "selector": {
                                    "type": "de.rli.hypenergy.ask",
                                    "auctionId": auctionId
                                }
                            })];
                    case 3:
                        asks = (_a.sent());
                        lowestPrice = bids.concat(asks).reduce(function (acc, element) {
                            if (element.price < acc) {
                                acc = element.price;
                            }
                            return acc;
                        }, 9999999);
                        highestPrice = bids.concat(asks).reduce(function (acc, element) {
                            if (element.price > acc) {
                                acc = element.price;
                            }
                            return acc;
                        }, 0);
                        demandCurve_1 = new Array(30).fill(0);
                        bids.map(function (bid) { return demandCurve_1[bid.price] += bid.amount; });
                        supplyCurve_1 = new Array(30).fill(0);
                        asks.map(function (ask) { return supplyCurve_1[ask.price] += ask.amount; });
                        _highestPrice = highestPrice;
                        for (i = lowestPrice; i <= highestPrice; i++) {
                            supplyCurve_1[i] += supplyCurve_1[i - 1];
                            demandCurve_1[_highestPrice - 1] += demandCurve_1[_highestPrice];
                            _highestPrice--;
                        }
                        debugger;
                        for (i = lowestPrice; i <= highestPrice; i++) {
                            if (supplyCurve_1[i] >= demandCurve_1[i] && supplyCurve_1[i] != 0) {
                                if (supplyCurve_1[i - 1] != 0 && demandCurve_1[i] != 0) {
                                    if (demandCurve_1[i] < supplyCurve_1[i - 1]) {
                                        i--;
                                    }
                                    auction.mcp = i;
                                    auction.status = 2;
                                    auction.matchedAmount = Math.min(supplyCurve_1[i], demandCurve_1[i]);
                                    auction.unmatchedDemand = demandCurve_1[lowestPrice] - auction.matchedAmount;
                                    auction.unmatchedSupply = supplyCurve_1[highestPrice] - auction.matchedAmount;
                                    auction.save();
                                    debugger;
                                    return [2, auction];
                                }
                            }
                        }
                        auction.mcp = -1;
                        auction.status = 2;
                        auction.matchedAmount = 0;
                        auction.unmatchedDemand = demandCurve_1[lowestPrice] - auction.matchedAmount;
                        auction.unmatchedSupply = supplyCurve_1[highestPrice] - auction.matchedAmount;
                        auction.save();
                        return [2, auction];
                    case 4: return [2];
                }
            });
        });
    };
    EnergymarketController.prototype.escrowAuction = function (auctionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auction, bids, allAsks, asks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, auction_model_1.Auction.getOne(auctionId)];
                    case 1:
                        auction = _a.sent();
                        return [4, bid_model_1.Bid.query(bid_model_1.Bid, {
                                "selector": {
                                    "type": "de.rli.hypenergy.bid",
                                    "auctionId": auctionId
                                }
                            })];
                    case 2:
                        bids = (_a.sent());
                        return [4, ask_model_1.Ask.getAll()];
                    case 3:
                        allAsks = _a.sent();
                        asks = allAsks.filter(function (ask) { return ask.auctionId === auctionId; });
                        return [2, auction];
                }
            });
        });
    };
    EnergymarketController.prototype.transferCoins = function (from, to, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fromParticipant, toParticipant;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, marketParticipant_model_1.MarketParticipant.getOne(from)];
                    case 1:
                        fromParticipant = _a.sent();
                        return [4, marketParticipant_model_1.MarketParticipant.getOne(to)];
                    case 2:
                        toParticipant = _a.sent();
                        if (!fromParticipant.id) {
                            throw new Error("Source participant " + from + " doesn't exist");
                        }
                        if (!toParticipant.id) {
                            throw new Error("Destination participant " + to + " doesn't exist");
                        }
                        if (fromParticipant.coinBalance < amount || fromParticipant.frozenCoins < amount) {
                            throw new Error("Participant " + from + " doesn't have enough coins");
                        }
                        fromParticipant.coinBalance -= amount;
                        toParticipant.coinBalance += amount;
                        return [4, Promise.all([fromParticipant.save(), toParticipant.save()])];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Create('MarketParticipant'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(marketParticipant_model_1.MarketParticipant))
    ], EnergymarketController.prototype, "createMarketParticipant", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetAll('MarketParticipant'),
        convector_core_1.Invokable()
    ], EnergymarketController.prototype, "getAllMarketParticipants", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetById('MarketParticipant'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], EnergymarketController.prototype, "getMarketParticipantById", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Create('Auction'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(auction_model_1.Auction))
    ], EnergymarketController.prototype, "createAuction", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetAll('Auction'),
        convector_core_1.Invokable()
    ], EnergymarketController.prototype, "getAllAuctions", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetById('Auction'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], EnergymarketController.prototype, "getAuctionById", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Create('Market'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(market_model_1.Market))
    ], EnergymarketController.prototype, "createMarket", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetAll('Market'),
        convector_core_1.Invokable()
    ], EnergymarketController.prototype, "getAllMarkets", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Create('Bid'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(bid_model_1.Bid))
    ], EnergymarketController.prototype, "placeBid", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetAll('Bid'),
        convector_core_1.Invokable()
    ], EnergymarketController.prototype, "getAllBids", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetById('Bid'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], EnergymarketController.prototype, "getBidById", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Service(),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], EnergymarketController.prototype, "getBidsByAuctionId", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Create('Ask'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(ask_model_1.Ask))
    ], EnergymarketController.prototype, "placeAsk", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetAll('Ask'),
        convector_core_1.Invokable()
    ], EnergymarketController.prototype, "getAllAsks", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetById('Ask'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], EnergymarketController.prototype, "getAskById", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Service(),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], EnergymarketController.prototype, "getAsksByAuctionId", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Service(),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], EnergymarketController.prototype, "clearAuction", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Service(),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string()))
    ], EnergymarketController.prototype, "escrowAuction", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Service(),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(yup.string())),
        tslib_1.__param(1, convector_core_1.Param(yup.string())),
        tslib_1.__param(2, convector_core_1.Param(yup.number()))
    ], EnergymarketController.prototype, "transferCoins", null);
    EnergymarketController = tslib_1.__decorate([
        convector_core_1.Controller('energymarket')
    ], EnergymarketController);
    return EnergymarketController;
}(convector_core_1.ConvectorController));
exports.EnergymarketController = EnergymarketController;
//# sourceMappingURL=energymarket.controller_old.js.map