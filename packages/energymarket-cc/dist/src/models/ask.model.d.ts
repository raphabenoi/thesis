import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class FullAsk extends ConvectorModel<FullAsk> {
    readonly type = "de.rli.hypenergy.askTransientInput";
    readonly auctionId: string;
    sender: string;
    amount: number;
    price: number;
    successful: boolean;
    unmatchedAmount: number;
}
export declare class Ask extends ConvectorModel<Ask> {
    readonly type = "de.rli.hypenergy.ask";
    readonly auctionId: string;
    sender: string;
    successful: boolean;
}
export declare class AskPrivateDetails extends ConvectorModel<AskPrivateDetails> {
    readonly type = "de.rli.hypenergy.ask";
    amount: number;
    price: number;
    unmatchedAmount: number;
}
