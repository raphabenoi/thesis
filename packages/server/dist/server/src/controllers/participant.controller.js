"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var convector_1 = require("../convector");
var router = express_1.Router();
convector_1.InitServerIdentity();
router.get('/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var id, _a, _b, err_1;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = req.params.id;
                _b = (_a = res).send;
                return [4, convector_1.ParticipantControllerBackEnd.get(id)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [3, 3];
            case 2:
                err_1 = _c.sent();
                console.log(JSON.stringify(err_1));
                res.status(500).send(err_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
exports.ParticipantExpressController = router;
//# sourceMappingURL=participant.controller.js.map