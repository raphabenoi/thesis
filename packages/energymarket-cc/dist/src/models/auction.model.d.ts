import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare enum AuctionStatus {
    OPEN = 0,
    CLOSED = 1,
    CLEARED = 2,
    ESCROWED = 3
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
