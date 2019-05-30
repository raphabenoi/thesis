"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var FullAsk = (function (_super) {
    tslib_1.__extends(FullAsk, _super);
    function FullAsk() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.askTransientInput';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], FullAsk.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], FullAsk.prototype, "auctionId", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], FullAsk.prototype, "sender", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], FullAsk.prototype, "amount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], FullAsk.prototype, "price", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.boolean()),
        convector_core_model_1.Default(false)
    ], FullAsk.prototype, "successful", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], FullAsk.prototype, "unmatchedAmount", void 0);
    return FullAsk;
}(convector_core_model_1.ConvectorModel));
exports.FullAsk = FullAsk;
var Ask = (function (_super) {
    tslib_1.__extends(Ask, _super);
    function Ask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.ask';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], Ask.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Ask.prototype, "auctionId", void 0);
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Ask.prototype, "sender", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.boolean()),
        convector_core_model_1.Default(false)
    ], Ask.prototype, "successful", void 0);
    return Ask;
}(convector_core_model_1.ConvectorModel));
exports.Ask = Ask;
var AskPrivateDetails = (function (_super) {
    tslib_1.__extends(AskPrivateDetails, _super);
    function AskPrivateDetails() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.ask';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], AskPrivateDetails.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], AskPrivateDetails.prototype, "amount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], AskPrivateDetails.prototype, "price", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], AskPrivateDetails.prototype, "unmatchedAmount", void 0);
    return AskPrivateDetails;
}(convector_core_model_1.ConvectorModel));
exports.AskPrivateDetails = AskPrivateDetails;
//# sourceMappingURL=ask.model.js.map