import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class FullBid extends ConvectorModel<FullBid> {
    readonly type: string;
    readonly auctionId: string;
    sender: string;
    amount: number;
    price: number;
    successful: boolean;
    unmatchedAmount: number;
}
export declare class Bid extends ConvectorModel<Bid> {
    readonly type: string;
    readonly auctionId: string;
    sender: string;
    successful: boolean;
}
export declare class BidPrivateDetails extends ConvectorModel<BidPrivateDetails> {
    readonly type: string;
    amount: number;
    price: number;
    unmatchedAmount: number;
}
