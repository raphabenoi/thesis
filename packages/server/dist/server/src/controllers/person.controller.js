"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var convector_1 = require("../convector");
var person_cc_1 = require("person-cc");
var env_1 = require("../env");
var router = express_1.Router();
router.post('/', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, id, name, personToCreate, err_1;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, name = _a.name;
                personToCreate = new person_cc_1.Person({ id: id, name: name });
                return [4, convector_1.PersonControllerBackEnd.create(personToCreate)];
            case 1:
                _b.sent();
                res.status(201).send();
                return [3, 3];
            case 2:
                err_1 = _b.sent();
                console.log(JSON.stringify(err_1));
                res.status(500).send(err_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.get('/:id', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var id, personToReturn, _a, err_2;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = person_cc_1.Person.bind;
                return [4, convector_1.PersonControllerBackEnd.get(id)];
            case 1:
                personToReturn = new (_a.apply(person_cc_1.Person, [void 0, _b.sent()]))();
                res.send(personToReturn.toJSON());
                return [3, 3];
            case 2:
                err_2 = _b.sent();
                console.log(JSON.stringify(err_2));
                res.status(500).send(err_2);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
router.post('/:id/add-attribute', function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var id, _a, attributeId, content, attribute, attributeToAdd, personToReturn, _b, err_3;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, attributeId = _a.attributeId, content = _a.content;
                attribute = new person_cc_1.Attribute(attributeId);
                attribute.certifierID = 'mit';
                attribute.content = {
                    level: 'dummy',
                    honours: 'high',
                    description: 'Important title!'
                };
                attribute.issuedDate = Date.now();
                attributeToAdd = new person_cc_1.Attribute(attributeId);
                attributeToAdd.content = content;
                attributeToAdd.issuedDate = Date.now();
                attributeToAdd.certifierID = env_1.identityId;
                return [4, convector_1.PersonControllerBackEnd.addAttribute(id, attributeToAdd)];
            case 1:
                _c.sent();
                _b = person_cc_1.Person.bind;
                return [4, convector_1.PersonControllerBackEnd.get(id)];
            case 2:
                personToReturn = new (_b.apply(person_cc_1.Person, [void 0, _c.sent()]))();
                res.send(personToReturn.toJSON());
                return [3, 4];
            case 3:
                err_3 = _c.sent();
                console.log(JSON.stringify(err_3));
                res.status(500).send(err_3);
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
exports.PersonExpressController = router;
//# sourceMappingURL=person.controller.js.map