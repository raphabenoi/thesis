import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Grid extends ConvectorModel<Grid> {
    readonly type = "de.rli.hypenergy.grid";
    coinBalance: number;
    energyBalance: number;
    gridBuyPrice: number;
    gridSellPrice: number;
}
