"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var SmartMeter = (function (_super) {
    tslib_1.__extends(SmartMeter, _super);
    function SmartMeter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.smartMeter';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], SmartMeter.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], SmartMeter.prototype, "owner", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], SmartMeter.prototype, "read", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], SmartMeter.prototype, "timestamp", void 0);
    return SmartMeter;
}(convector_core_model_1.ConvectorModel));
exports.SmartMeter = SmartMeter;
//# sourceMappingURL=smartMeter.model.js.map