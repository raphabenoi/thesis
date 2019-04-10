import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Ask extends ConvectorModel<Ask> {
    readonly type: string;
    readonly auctionId: string;
    sender: string;
    amount: number;
    price: number;
    successful: boolean;
    unmatchedAmount: number;
}
