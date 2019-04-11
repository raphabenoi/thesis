import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare enum AuctionStatus {
    open = "open",
    closed = "closed",
    cleared = "cleared",
    escrowed = "escrowed"
}
export declare class Auction extends ConvectorModel<Auction> {
    readonly type = "de.rli.hypenergy.auction";
    status: AuctionStatus;
    readonly start: number;
    readonly end: number;
    mcp: number;
    matchedAmount: number;
    unmatchedSupply: number;
    unmatchedDemand: number;
}
