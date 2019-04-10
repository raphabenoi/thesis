import { resolve } from "path";
import { ClientFactory } from "@worldsibu/convector-core-adapter";
import { SelfGenContext } from "./selfgenfabriccontext";
import { EnergymarketController } from "energymarket-cc/dist/src"; 
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';

export namespace EnergymarketControllerClient  {
    export async function init(): Promise<EnergymarketController> {
        const user = process.env.USERCERT || 'user1';
        await SelfGenContext.getClient();
        // Inject a Adapter of type *Fabric Controller*
        // Setup accordingly to the
        const adapter = new FabricControllerAdapter({
            txTimeout: 300000,
            user: user,
            channel: process.env.CHANNEL,
            chaincode: process.env.CHAINCODE,
            keyStore: resolve(__dirname, process.env.KEYSTORE),
            networkProfile: resolve(__dirname, process.env.NETWORKPROFILE),
            userMspPath: resolve(__dirname, process.env.KEYSTORE),
        });
        await adapter.init();
        // Return your own implementation of the controller

        return ClientFactory(EnergymarketController, adapter);
    }
}

