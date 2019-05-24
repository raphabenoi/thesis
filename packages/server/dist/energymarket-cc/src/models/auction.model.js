"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var AuctionStatus;
(function (AuctionStatus) {
    AuctionStatus["open"] = "open";
    AuctionStatus["closed"] = "closed";
    AuctionStatus["cleared"] = "cleared";
    AuctionStatus["escrowed"] = "escrowed";
})(AuctionStatus = exports.AuctionStatus || (exports.AuctionStatus = {}));
var Auction = (function (_super) {
    tslib_1.__extends(Auction, _super);
    function Auction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.auction';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], Auction.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string().oneOf(Object.keys(AuctionStatus).map(function (k) { return AuctionStatus[k]; }))),
        convector_core_model_1.Default(AuctionStatus.open)
    ], Auction.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Auction.prototype, "start", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Auction.prototype, "end", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Auction.prototype, "mcp", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Auction.prototype, "matchedAmount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Auction.prototype, "unmatchedSupply", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Auction.prototype, "unmatchedDemand", void 0);
    return Auction;
}(convector_core_model_1.ConvectorModel));
exports.Auction = Auction;
//# sourceMappingURL=auction.model.js.map