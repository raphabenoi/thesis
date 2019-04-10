"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var ParticipantType;
(function (ParticipantType) {
    ParticipantType["prdoducer"] = "producer";
    ParticipantType["consumer"] = "consumer";
    ParticipantType["prosumer"] = "prosumer";
})(ParticipantType = exports.ParticipantType || (exports.ParticipantType = {}));
var SmartMeterReading = (function (_super) {
    tslib_1.__extends(SmartMeterReading, _super);
    function SmartMeterReading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.smartMeterReading';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly()
    ], SmartMeterReading.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], SmartMeterReading.prototype, "auctionPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], SmartMeterReading.prototype, "consumed", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], SmartMeterReading.prototype, "produced", void 0);
    return SmartMeterReading;
}(convector_core_model_1.ConvectorModel));
exports.SmartMeterReading = SmartMeterReading;
var MarketParticipant = (function (_super) {
    tslib_1.__extends(MarketParticipant, _super);
    function MarketParticipant() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.marketParticipant';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], MarketParticipant.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], MarketParticipant.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string().oneOf(Object.keys(ParticipantType).map(function (k) { return ParticipantType[k]; })))
    ], MarketParticipant.prototype, "is", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], MarketParticipant.prototype, "coinBalance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], MarketParticipant.prototype, "frozenCoins", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], MarketParticipant.prototype, "energyBalance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(SmartMeterReading.schema()); })),
        convector_core_model_1.Default(new Array())
    ], MarketParticipant.prototype, "readings", void 0);
    return MarketParticipant;
}(convector_core_model_1.ConvectorModel));
exports.MarketParticipant = MarketParticipant;
//# sourceMappingURL=marketParticipant.model.js.map