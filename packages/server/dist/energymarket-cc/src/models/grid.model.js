"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var Grid = (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'de.rli.hypenergy.grid';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly(),
        convector_core_model_1.Required()
    ], Grid.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], Grid.prototype, "coinBalance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number()),
        convector_core_model_1.Default(0)
    ], Grid.prototype, "energyBalance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Grid.prototype, "gridBuyPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], Grid.prototype, "gridSellPrice", void 0);
    return Grid;
}(convector_core_model_1.ConvectorModel));
exports.Grid = Grid;
//# sourceMappingURL=grid.model.js.map