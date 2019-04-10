import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class Bid extends ConvectorModel<Bid> {
    readonly type: string;
    readonly auctionId: string;
    sender: string;
    amount: number;
    price: number;
    successful: boolean;
    unmatchedAmount: number;
}
