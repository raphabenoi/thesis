import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Ask extends ConvectorModel<Ask> {
    readonly type = "de.rli.hypenergy.ask";
    readonly auctionId: string;
    sender: string;
    amount: number;
    price: number;
    successful: boolean;
    unmatchedAmount: number;
}
