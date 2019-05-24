"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var env_1 = require("./env");
var energymarket_controller_1 = require("./controllers/energymarket.controller");
var app = express();
var port = env_1.port;
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '40mb'
}));
app.use(bodyParser.json({ limit: '40mb' }));
app.use('/energymarket', energymarket_controller_1.EnergymarketExpressController);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.listen(port, function () {
    return console.log("Server started in port " + port);
});
module.exports = app;
//# sourceMappingURL=app.js.map