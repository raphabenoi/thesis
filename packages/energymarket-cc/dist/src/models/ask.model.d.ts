import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class FullAsk extends ConvectorModel<FullAsk> {
    readonly type: string;
    readonly auctionId: string;
    sender: string;
    amount: number;
    price: number;
    successful: boolean;
    unmatchedAmount: number;
}
export declare class Ask extends ConvectorModel<Ask> {
    readonly type: string;
    readonly auctionId: string;
    sender: string;
    successful: boolean;
}
export declare class AskPrivateDetails extends ConvectorModel<AskPrivateDetails> {
    readonly type: string;
    amount: number;
    price: number;
    unmatchedAmount: number;
}
