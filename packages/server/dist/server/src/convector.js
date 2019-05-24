"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var env_1 = require("./env");
var convector_adapter_fabric_1 = require("@worldsibu/convector-adapter-fabric");
var convector_core_1 = require("@worldsibu/convector-core");
var src_1 = require("../../energymarket-cc/src");
var adapter = new convector_adapter_fabric_1.FabricControllerAdapter({
    txTimeout: 300000,
    user: env_1.identityName,
    channel: env_1.channel,
    chaincode: env_1.chaincode,
    keyStore: path_1.resolve(__dirname, env_1.keyStore),
    networkProfile: path_1.resolve(__dirname, env_1.networkProfile)
});
exports.initAdapter = adapter.init();
exports.EnergymarketControllerBackEnd = convector_core_1.ClientFactory(src_1.EnergymarketController, adapter);
//# sourceMappingURL=convector.js.map