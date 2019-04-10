import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Market extends ConvectorModel<Market> {
    readonly type = "de.rli.hypenergy.market";
    auctionTime: number;
    coinBalance: number;
    energyBalance: number;
    gridBuyPrice: number;
    gridSellPrice: number;
}
