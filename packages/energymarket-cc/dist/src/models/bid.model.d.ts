import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class FullBid extends ConvectorModel<FullBid> {
    readonly type = "de.rli.hypenergy.bidTransientInput";
    readonly auctionId: string;
    sender: string;
    amount: number;
    price: number;
    successful: boolean;
    unmatchedAmount: number;
}
export declare class Bid extends ConvectorModel<Bid> {
    readonly type = "de.rli.hypenergy.bid";
    readonly auctionId: string;
    sender: string;
    successful: boolean;
}
export declare class BidPrivateDetails extends ConvectorModel<BidPrivateDetails> {
    readonly type = "de.rli.hypenergy.bid";
    amount: number;
    price: number;
    unmatchedAmount: number;
}
