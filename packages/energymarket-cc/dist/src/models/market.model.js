"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var Market = (function (_super) {
    tslib_1.__extends(Market, _super);
    function Market() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.market';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], Market.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(9000000)
    ], Market.prototype, "auctionTime", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], Market.prototype, "coinBalance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], Market.prototype, "energyBalance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Market.prototype, "gridBuyPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Market.prototype, "gridSellPrice", void 0);
    return Market;
}(convector_core_model_1.ConvectorModel));
exports.Market = Market;
//# sourceMappingURL=market.model.js.map