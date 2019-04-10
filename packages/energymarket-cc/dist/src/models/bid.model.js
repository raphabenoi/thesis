"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var Bid = (function (_super) {
    tslib_1.__extends(Bid, _super);
    function Bid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.bid';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], Bid.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Bid.prototype, "auctionId", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Bid.prototype, "sender", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Bid.prototype, "amount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Bid.prototype, "price", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.boolean()),
        convector_core_model_1.Default(false)
    ], Bid.prototype, "successful", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Bid.prototype, "unmatchedAmount", void 0);
    return Bid;
}(convector_core_model_1.ConvectorModel));
exports.Bid = Bid;
//# sourceMappingURL=bid.model.js.map