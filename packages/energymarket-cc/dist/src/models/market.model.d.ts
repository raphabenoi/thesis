import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Market extends ConvectorModel<Market> {
    readonly type: string;
    auctionTime: number;
    coinBalance: number;
    energyBalance: number;
    gridBuyPrice: number;
    gridSellPrice: number;
    fingerprint: string;
}
