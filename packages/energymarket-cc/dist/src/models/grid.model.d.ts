import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Grid extends ConvectorModel<Grid> {
    readonly type: string;
    coinBalance: number;
    energyBalance: number;
    gridBuyPrice: number;
    gridSellPrice: number;
}
