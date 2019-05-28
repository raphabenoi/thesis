"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_1 = require("@worldsibu/convector-core");
var ask_model_1 = require("./models/ask.model");
var auction_model_1 = require("./models/auction.model");
var bid_model_1 = require("./models/bid.model");
var market_model_1 = require("./models/market.model");
var grid_model_1 = require("./models/grid.model");
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
                    case 0:
                        marketParticipant.fingerprint = this.sender;
                        return [4, marketParticipant.save()];
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
                    case 0:
                        market.fingerprint = this.sender;
                        return [4, market.save()];
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
    EnergymarketController.prototype.createGrid = function (grid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        grid.fingerprint = this.sender;
                        return [4, grid.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EnergymarketController.prototype.getAllGrids = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storedGrids;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, grid_model_1.Grid.getAll()];
                    case 1:
                        storedGrids = _a.sent();
                        return [2, storedGrids];
                }
            });
        });
    };
    EnergymarketController.prototype.placeBid = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bid, participant, publicBid, privateBid;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.tx.getTransientValue('bid', bid_model_1.FullBid)];
                    case 1:
                        bid = _a.sent();
                        return [4, marketParticipant_model_1.MarketParticipant.getAll().then(function (participants) { return participants.find(function (participant) { return participant.fingerprint === _this.sender; }); })];
                    case 2:
                        participant = _a.sent();
                        console.log('participant.fingerprint:' + participant.fingerprint);
                        console.log('participant.id:' + participant.id);
                        console.log('this.sender:' + this.sender);
                        console.log('bid.sender:' + bid.sender);
                        if (participant.id !== bid.sender) {
                            throw new Error("Fingerprints don't match. Expected 'participant.id' to be '" + participant.id + "'. But 'bid.sender' was '" + bid.sender + "'");
                        }
                        publicBid = new bid_model_1.Bid({
                            id: bid.id,
                            auctionId: bid.auctionId,
                            sender: bid.sender
                        });
                        return [4, publicBid.save()];
                    case 3:
                        _a.sent();
                        privateBid = new bid_model_1.BidPrivateDetails({
                            id: bid.id,
                            price: bid.price,
                            amount: bid.amount
                        });
                        return [4, privateBid.save({ privateCollection: bid.sender })];
                    case 4:
                        _a.sent();
                        return [2, publicBid.toJSON()];
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
    EnergymarketController.prototype.placeAsk = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ask, participant, publicAsk, privateAsk;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.tx.getTransientValue('ask', ask_model_1.FullAsk)];
                    case 1:
                        ask = _a.sent();
                        return [4, marketParticipant_model_1.MarketParticipant.getAll().then(function (participants) { return participants.find(function (participant) { return participant.fingerprint === _this.sender; }); })];
                    case 2:
                        participant = _a.sent();
                        if (participant.id !== ask.sender) {
                            throw new Error("Fingerprints don't match. Expected 'participant.id' to be '" + participant.id + "'. But 'bid.sender' was '" + ask.sender + "'");
                        }
                        publicAsk = new ask_model_1.Ask({
                            id: ask.id,
                            auctionId: ask.auctionId,
                            sender: ask.sender
                        });
                        return [4, publicAsk.save()];
                    case 3:
                        _a.sent();
                        privateAsk = new ask_model_1.AskPrivateDetails({
                            id: ask.id,
                            price: ask.price,
                            amount: ask.amount
                        });
                        return [4, privateAsk.save({ privateCollection: ask.sender })];
                    case 4:
                        _a.sent();
                        return [2, publicAsk.toJSON()];
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
    EnergymarketController.prototype.sendReading = function (reading) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var participant;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, marketParticipant_model_1.MarketParticipant.getAll().then(function (participants) { return participants.find(function (participant) { return participant.fingerprint === _this.sender; }); })];
                    case 1:
                        participant = _a.sent();
                        participant.readings.push(reading);
                        return [4, participant.save()];
                    case 2:
                        _a.sent();
                        return [2, participant];
                }
            });
        });
    };
    EnergymarketController.prototype.clearAuction = function (auctionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var privateBids, privateAsks, auction, txTimestamp, publicBids, bids, _loop_1, _i, publicBids_1, bid, publicAsks, asks, _loop_2, _a, publicAsks_1, ask, lowestPrice, highestPrice, demandCurve_1, supplyCurve_1, _highestPrice, i, _loop_3, out_i_1, i, state_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.tx.getTransientValue('bids', yup.array(bid_model_1.BidPrivateDetails.schema()))];
                    case 1:
                        privateBids = _b.sent();
                        return [4, this.tx.getTransientValue('asks', yup.array(ask_model_1.AskPrivateDetails.schema()))];
                    case 2:
                        privateAsks = _b.sent();
                        return [4, auction_model_1.Auction.getOne(auctionId)];
                    case 3:
                        auction = _b.sent();
                        txTimestamp = (Date.now() + 30000000);
                        if (txTimestamp <= auction.end) {
                            throw new Error("Auction is still 'OPEN' and cannot be cleared yet. Try again once 'txTimestamp' > 'auction.end'");
                        }
                        if (!(txTimestamp > auction.end)) return [3, 10];
                        return [4, bid_model_1.Bid.query(bid_model_1.Bid, {
                                "selector": {
                                    "type": "de.rli.hypenergy.bid",
                                    "auctionId": auctionId
                                }
                            })];
                    case 4:
                        publicBids = (_b.sent());
                        bids = new Array();
                        _loop_1 = function (bid) {
                            var bidPrivateDetails = privateBids.find(function (b) { return b.id === bid.id; });
                            var mergedBid = new bid_model_1.FullBid({
                                id: bid.id,
                                auctionId: bid.auctionId,
                                sender: bid.sender,
                                amount: bidPrivateDetails.amount,
                                price: bidPrivateDetails.price
                            });
                            bids.push(mergedBid);
                        };
                        for (_i = 0, publicBids_1 = publicBids; _i < publicBids_1.length; _i++) {
                            bid = publicBids_1[_i];
                            _loop_1(bid);
                        }
                        return [4, ask_model_1.Ask.query(ask_model_1.Ask, {
                                "selector": {
                                    "type": "de.rli.hypenergy.ask",
                                    "auctionId": auctionId
                                }
                            })];
                    case 5:
                        publicAsks = (_b.sent());
                        asks = new Array();
                        _loop_2 = function (ask) {
                            var askPrivateDetails = privateAsks.find(function (a) { return a.id === ask.id; });
                            var mergedAsk = new ask_model_1.FullAsk({
                                id: ask.id,
                                auctionId: ask.auctionId,
                                sender: ask.sender,
                                amount: askPrivateDetails.amount,
                                price: askPrivateDetails.price
                            });
                            asks.push(mergedAsk);
                        };
                        for (_a = 0, publicAsks_1 = publicAsks; _a < publicAsks_1.length; _a++) {
                            ask = publicAsks_1[_a];
                            _loop_2(ask);
                        }
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
                        _loop_3 = function (i) {
                            var maxMatchedAmount, _loop_4, _i, _a, bid, _loop_5, _b, _c, ask, _loop_6, _d, _e, ask, state_2, _loop_7, _f, _g, ask, _loop_8, _h, _j, bid, _loop_9, _k, _l, bid, state_3;
                            return tslib_1.__generator(this, function (_m) {
                                switch (_m.label) {
                                    case 0:
                                        if (!(supplyCurve_1[i] >= demandCurve_1[i] && supplyCurve_1[i] != 0)) return [3, 26];
                                        if (supplyCurve_1[i - 1] === 0 && demandCurve_1[i] === 0) {
                                            return [2, (out_i_1 = i, "break")];
                                        }
                                        if (demandCurve_1[i] < supplyCurve_1[i - 1]) {
                                            i--;
                                        }
                                        auction.mcp = i;
                                        auction.status = auction_model_1.AuctionStatus.cleared;
                                        maxMatchedAmount = Math.min(supplyCurve_1[i], demandCurve_1[i]);
                                        auction.matchedAmount = 0;
                                        if (!(supplyCurve_1[i] > demandCurve_1[i])) return [3, 13];
                                        _loop_4 = function (bid) {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4, publicBids.find(function (publicBid) { return publicBid.id == bid.id; }).update({ successful: true })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        };
                                        _i = 0, _a = bids.filter(function (bid) { return bid.price >= i; });
                                        _m.label = 1;
                                    case 1:
                                        if (!(_i < _a.length)) return [3, 4];
                                        bid = _a[_i];
                                        return [5, _loop_4(bid)];
                                    case 2:
                                        _m.sent();
                                        _m.label = 3;
                                    case 3:
                                        _i++;
                                        return [3, 1];
                                    case 4:
                                        _loop_5 = function (ask) {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        maxMatchedAmount -= ask.amount;
                                                        auction.matchedAmount += ask.amount;
                                                        return [4, publicAsks.find(function (publicAsk) { return publicAsk.id == ask.id; }).update({ successful: true })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        };
                                        _b = 0, _c = asks.filter(function (ask) { return ask.price < i; });
                                        _m.label = 5;
                                    case 5:
                                        if (!(_b < _c.length)) return [3, 8];
                                        ask = _c[_b];
                                        return [5, _loop_5(ask)];
                                    case 6:
                                        _m.sent();
                                        _m.label = 7;
                                    case 7:
                                        _b++;
                                        return [3, 5];
                                    case 8:
                                        _loop_6 = function (ask) {
                                            var privateAsk;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!((maxMatchedAmount - ask.amount) >= 0)) return [3, 2];
                                                        maxMatchedAmount -= ask.amount;
                                                        auction.matchedAmount += ask.amount;
                                                        return [4, publicAsks.find(function (publicAsk) { return publicAsk.id == ask.id; }).update({ successful: true })];
                                                    case 1:
                                                        _a.sent();
                                                        return [3, 5];
                                                    case 2:
                                                        ask.unmatchedAmount = ask.amount - maxMatchedAmount;
                                                        auction.matchedAmount += maxMatchedAmount;
                                                        return [4, publicAsks.find(function (publicAsk) { return publicAsk.id == ask.id; }).update({ successful: true })];
                                                    case 3:
                                                        _a.sent();
                                                        privateAsk = new ask_model_1.AskPrivateDetails({
                                                            id: ask.id,
                                                            price: ask.price,
                                                            amount: ask.amount,
                                                            unmatchedAmount: ask.unmatchedAmount
                                                        });
                                                        return [4, privateAsk.save({ privateCollection: ask.sender })];
                                                    case 4:
                                                        _a.sent();
                                                        return [2, "break"];
                                                    case 5: return [2];
                                                }
                                            });
                                        };
                                        _d = 0, _e = asks.filter(function (ask) { return ask.price == i; });
                                        _m.label = 9;
                                    case 9:
                                        if (!(_d < _e.length)) return [3, 12];
                                        ask = _e[_d];
                                        return [5, _loop_6(ask)];
                                    case 10:
                                        state_2 = _m.sent();
                                        if (state_2 === "break")
                                            return [3, 12];
                                        _m.label = 11;
                                    case 11:
                                        _d++;
                                        return [3, 9];
                                    case 12: return [3, 25];
                                    case 13:
                                        _loop_7 = function (ask) {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4, publicAsks.find(function (publicAsk) { return publicAsk.id == ask.id; }).update({ successful: true })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        };
                                        _f = 0, _g = asks.filter(function (ask) { return ask.price <= i; });
                                        _m.label = 14;
                                    case 14:
                                        if (!(_f < _g.length)) return [3, 17];
                                        ask = _g[_f];
                                        return [5, _loop_7(ask)];
                                    case 15:
                                        _m.sent();
                                        _m.label = 16;
                                    case 16:
                                        _f++;
                                        return [3, 14];
                                    case 17:
                                        _loop_8 = function (bid) {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        maxMatchedAmount -= bid.amount;
                                                        auction.matchedAmount += bid.amount;
                                                        return [4, publicBids.find(function (publicBid) { return publicBid.id == bid.id; }).update({ successful: true })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        };
                                        _h = 0, _j = bids.filter(function (bid) { return bid.price > i; });
                                        _m.label = 18;
                                    case 18:
                                        if (!(_h < _j.length)) return [3, 21];
                                        bid = _j[_h];
                                        return [5, _loop_8(bid)];
                                    case 19:
                                        _m.sent();
                                        _m.label = 20;
                                    case 20:
                                        _h++;
                                        return [3, 18];
                                    case 21:
                                        _loop_9 = function (bid) {
                                            var privateBid;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!((maxMatchedAmount - bid.amount) >= 0)) return [3, 2];
                                                        maxMatchedAmount -= bid.amount;
                                                        auction.matchedAmount += bid.amount;
                                                        return [4, publicBids.find(function (publicBid) { return publicBid.id == bid.id; }).update({ successful: true })];
                                                    case 1:
                                                        _a.sent();
                                                        return [3, 5];
                                                    case 2:
                                                        bid.unmatchedAmount = bid.amount - maxMatchedAmount;
                                                        auction.matchedAmount += maxMatchedAmount;
                                                        return [4, publicBids.find(function (publicBid) { return publicBid.id == bid.id; }).update({ successful: true })];
                                                    case 3:
                                                        _a.sent();
                                                        privateBid = new bid_model_1.BidPrivateDetails({
                                                            id: bid.id,
                                                            price: bid.price,
                                                            amount: bid.amount,
                                                            unmatchedAmount: bid.unmatchedAmount
                                                        });
                                                        return [4, privateBid.save({ privateCollection: bid.sender })];
                                                    case 4:
                                                        _a.sent();
                                                        return [2, "break"];
                                                    case 5: return [2];
                                                }
                                            });
                                        };
                                        _k = 0, _l = bids.filter(function (bid) { return bid.price == i; });
                                        _m.label = 22;
                                    case 22:
                                        if (!(_k < _l.length)) return [3, 25];
                                        bid = _l[_k];
                                        return [5, _loop_9(bid)];
                                    case 23:
                                        state_3 = _m.sent();
                                        if (state_3 === "break")
                                            return [3, 25];
                                        _m.label = 24;
                                    case 24:
                                        _k++;
                                        return [3, 22];
                                    case 25:
                                        auction.unmatchedDemand = demandCurve_1[lowestPrice] - auction.matchedAmount;
                                        auction.unmatchedSupply = supplyCurve_1[highestPrice] - auction.matchedAmount;
                                        auction.save();
                                        return [2, { value: auction }];
                                    case 26:
                                        out_i_1 = i;
                                        return [2];
                                }
                            });
                        };
                        i = lowestPrice;
                        _b.label = 6;
                    case 6:
                        if (!(i <= highestPrice)) return [3, 9];
                        return [5, _loop_3(i)];
                    case 7:
                        state_1 = _b.sent();
                        i = out_i_1;
                        if (typeof state_1 === "object")
                            return [2, state_1.value];
                        if (state_1 === "break")
                            return [3, 9];
                        _b.label = 8;
                    case 8:
                        i++;
                        return [3, 6];
                    case 9:
                        auction.mcp = -1;
                        auction.status = auction_model_1.AuctionStatus.cleared;
                        auction.matchedAmount = 0;
                        auction.unmatchedDemand = demandCurve_1[lowestPrice] - auction.matchedAmount;
                        auction.unmatchedSupply = supplyCurve_1[highestPrice] - auction.matchedAmount;
                        auction.save();
                        return [2, auction];
                    case 10: return [2];
                }
            });
        });
    };
    EnergymarketController.prototype.escrowAuction = function (auctionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var privateBids, privateAsks, auction, grid, market, participants, publicBids, successfulBids, _loop_10, _i, publicBids_2, bid, publicAsks, successfulAsks, _loop_11, _a, publicAsks_2, ask, _loop_12, _b, participants_1, participant;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.tx.getTransientValue('bids', yup.array(bid_model_1.BidPrivateDetails.schema()))];
                    case 1:
                        privateBids = _c.sent();
                        return [4, this.tx.getTransientValue('asks', yup.array(ask_model_1.AskPrivateDetails.schema()))];
                    case 2:
                        privateAsks = _c.sent();
                        return [4, auction_model_1.Auction.getOne(auctionId)];
                    case 3:
                        auction = _c.sent();
                        return [4, grid_model_1.Grid.getOne('GRID')];
                    case 4:
                        grid = _c.sent();
                        return [4, market_model_1.Market.getOne('MKT')];
                    case 5:
                        market = _c.sent();
                        return [4, marketParticipant_model_1.MarketParticipant.getAll()];
                    case 6:
                        participants = _c.sent();
                        return [4, bid_model_1.Bid.query(bid_model_1.Bid, {
                                "selector": {
                                    "type": "de.rli.hypenergy.bid",
                                    "auctionId": auctionId,
                                    "successful": true
                                }
                            })];
                    case 7:
                        publicBids = (_c.sent());
                        successfulBids = new Array();
                        _loop_10 = function (bid) {
                            var bidPrivateDetails = privateBids.find(function (b) { return b.id === bid.id; });
                            var mergedBid = new bid_model_1.FullBid({
                                id: bid.id,
                                auctionId: bid.auctionId,
                                sender: bid.sender,
                                amount: bidPrivateDetails.amount,
                                price: bidPrivateDetails.price
                            });
                            successfulBids.push(mergedBid);
                        };
                        for (_i = 0, publicBids_2 = publicBids; _i < publicBids_2.length; _i++) {
                            bid = publicBids_2[_i];
                            _loop_10(bid);
                        }
                        return [4, ask_model_1.Ask.query(ask_model_1.Ask, {
                                "selector": {
                                    "type": "de.rli.hypenergy.ask",
                                    "auctionId": auctionId,
                                    "successful": true
                                }
                            })];
                    case 8:
                        publicAsks = (_c.sent());
                        successfulAsks = new Array();
                        _loop_11 = function (ask) {
                            var askPrivateDetails = privateAsks.find(function (a) { return a.id === ask.id; });
                            var mergedAsk = new ask_model_1.FullAsk({
                                id: ask.id,
                                auctionId: ask.auctionId,
                                sender: ask.sender,
                                amount: askPrivateDetails.amount,
                                price: askPrivateDetails.price
                            });
                            successfulAsks.push(mergedAsk);
                        };
                        for (_a = 0, publicAsks_2 = publicAsks; _a < publicAsks_2.length; _a++) {
                            ask = publicAsks_2[_a];
                            _loop_11(ask);
                        }
                        _loop_12 = function (participant) {
                            var consumption = participant.readings.find(function (reading) { return reading.auctionPeriod == auction.id; }).consumed;
                            var production = participant.readings.find(function (reading) { return reading.auctionPeriod == auction.id; }).produced;
                            var bidAmount = successfulBids.filter(function (bid) { return bid.sender == participant.id; }).reduce(function (acc, bid) {
                                if (!bid.unmatchedAmount) {
                                    return acc + bid.amount;
                                }
                                else {
                                    return acc + (bid.amount - bid.unmatchedAmount);
                                }
                            }, 0);
                            var askAmount = successfulAsks.filter(function (ask) { return ask.sender == participant.id; }).reduce(function (acc, ask) {
                                if (!ask.unmatchedAmount) {
                                    return acc + ask.amount;
                                }
                                else {
                                    return acc + (ask.amount - ask.unmatchedAmount);
                                }
                            }, 0);
                            if (consumption != 0 || bidAmount != 0) {
                                participant.coinBalance -= bidAmount * auction.mcp;
                                participant.energyBalance += bidAmount;
                                market.coinBalance += bidAmount * auction.mcp;
                                market.energyBalance -= bidAmount;
                                if (consumption > bidAmount) {
                                    participant.coinBalance -= (consumption - bidAmount) * market.gridBuyPrice;
                                    participant.energyBalance += (consumption - bidAmount);
                                    market.coinBalance += (consumption - bidAmount) * market.gridBuyPrice;
                                    market.energyBalance -= (consumption - bidAmount);
                                }
                                if (consumption < bidAmount) {
                                    participant.coinBalance += (bidAmount - consumption) * market.gridSellPrice;
                                    participant.energyBalance -= (bidAmount - consumption);
                                    market.coinBalance -= (bidAmount - consumption) * market.gridSellPrice;
                                    market.energyBalance += (bidAmount - consumption);
                                }
                            }
                            if (production != 0 || askAmount != 0) {
                                participant.coinBalance += askAmount * auction.mcp;
                                participant.energyBalance -= askAmount;
                                market.coinBalance -= askAmount * auction.mcp;
                                market.energyBalance += askAmount;
                                if (production > askAmount) {
                                    participant.coinBalance += (production - askAmount) * market.gridSellPrice;
                                    participant.energyBalance -= (production - askAmount);
                                    market.coinBalance -= (production - askAmount) * market.gridSellPrice;
                                    market.energyBalance += (production - askAmount);
                                }
                                if (production < askAmount) {
                                    participant.coinBalance -= (askAmount - production) * market.gridBuyPrice;
                                    participant.energyBalance += (askAmount - production);
                                    market.coinBalance += (askAmount - production) * market.gridBuyPrice;
                                    market.energyBalance -= (askAmount - production);
                                }
                            }
                        };
                        for (_b = 0, participants_1 = participants; _b < participants_1.length; _b++) {
                            participant = participants_1[_b];
                            _loop_12(participant);
                        }
                        if (market.energyBalance < 0) {
                            grid.coinBalance += (-market.energyBalance) * market.gridBuyPrice;
                            ;
                            grid.energyBalance -= (-market.energyBalance);
                            market.coinBalance -= (-market.energyBalance) * market.gridBuyPrice;
                            market.energyBalance += (-market.energyBalance);
                        }
                        if (market.energyBalance > 0) {
                            grid.coinBalance -= market.energyBalance * market.gridSellPrice;
                            ;
                            grid.energyBalance += market.energyBalance;
                            market.coinBalance += market.energyBalance * market.gridSellPrice;
                            market.energyBalance -= market.energyBalance;
                        }
                        auction.status = auction_model_1.AuctionStatus.escrowed;
                        Promise.all(participants.map(function (participant) { return participant.save(); }));
                        return [4, auction.save()];
                    case 9:
                        _c.sent();
                        return [4, market.save()];
                    case 10:
                        _c.sent();
                        return [4, grid.save()];
                    case 11:
                        _c.sent();
                        return [2, {
                                participants: participants,
                                market: market,
                                grid: grid
                            }];
                }
            });
        });
    };
    EnergymarketController.prototype.buyFromGrid = function (buyerId, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var buyer, grid;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, marketParticipant_model_1.MarketParticipant.getOne(buyerId)];
                    case 1:
                        buyer = _a.sent();
                        return [4, grid_model_1.Grid.getOne('GRID')];
                    case 2:
                        grid = _a.sent();
                        if (!buyer.id) {
                            throw new Error("Source participant " + buyer + " doesn't exist");
                        }
                        if (!grid.id) {
                            throw new Error("Grid instance doesn't exist");
                        }
                        if (buyer.coinBalance < amount || buyer.frozenCoins < amount) {
                            throw new Error("Participant " + buyer + " doesn't have enough coins");
                        }
                        buyer.coinBalance -= amount * grid.gridBuyPrice;
                        buyer.energyBalance += amount;
                        grid.coinBalance += amount * grid.gridBuyPrice;
                        grid.energyBalance -= amount;
                        return [2, {
                                buyer: buyer,
                                grid: grid
                            }];
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
        convector_rest_api_decorators_1.Create('Grid'),
        convector_core_1.Invokable(),
        tslib_1.__param(0, convector_core_1.Param(grid_model_1.Grid))
    ], EnergymarketController.prototype, "createGrid", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.GetAll('Grid'),
        convector_core_1.Invokable()
    ], EnergymarketController.prototype, "getAllGrids", null);
    tslib_1.__decorate([
        convector_rest_api_decorators_1.Create('Bid'),
        convector_core_1.Invokable()
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
        convector_core_1.Invokable()
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
        tslib_1.__param(0, convector_core_1.Param(marketParticipant_model_1.SmartMeterReading))
    ], EnergymarketController.prototype, "sendReading", null);
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
        tslib_1.__param(1, convector_core_1.Param(yup.number()))
    ], EnergymarketController.prototype, "buyFromGrid", null);
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
//# sourceMappingURL=energymarket.controller.js.map