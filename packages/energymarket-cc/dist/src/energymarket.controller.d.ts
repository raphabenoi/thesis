import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import { ConvectorController, FlatConvectorModel } from '@worldsibu/convector-core';
import { Ask } from './models/ask.model';
import { Auction } from './models/auction.model';
import { Bid } from './models/bid.model';
import { Market } from './models/market.model';
import { Grid } from './models/grid.model';
import { MarketParticipant, SmartMeterReading } from './models/marketParticipant.model';
export declare class EnergymarketController extends ConvectorController<ChaincodeTx> {
    createMarketParticipant(marketParticipant: MarketParticipant): Promise<void>;
    getAllMarketParticipants(): Promise<MarketParticipant[]>;
    getMarketParticipantById(marketParticipantId: string): Promise<MarketParticipant>;
    createAuction(auction: Auction): Promise<void>;
    getAllAuctions(): Promise<Auction[]>;
    getAuctionById(auctionId: string): Promise<Auction>;
    createMarket(market: Market): Promise<void>;
    getAllMarkets(): Promise<Market[]>;
    createGrid(grid: Grid): Promise<void>;
    getAllGrids(): Promise<Grid[]>;
    placeBid(bid: Bid): Promise<Bid>;
    getAllBids(): Promise<Bid[]>;
    getBidById(bidId: string): Promise<Bid>;
    getBidsByAuctionId(auctionId: string): Promise<Bid[]>;
    placeAsk(ask: Ask): Promise<Ask>;
    getAllAsks(): Promise<Ask[]>;
    getAskById(askId: string): Promise<Ask>;
    getAsksByAuctionId(auctionId: string): Promise<Ask[]>;
    sendReading(reading: FlatConvectorModel<SmartMeterReading>, participantId: string): Promise<MarketParticipant>;
    clearAuction(auctionId: string): Promise<Auction>;
    escrowAuction(auctionId: string): Promise<{
        participants: MarketParticipant[];
        market: Market;
        grid: Grid;
    }>;
    buyFromGrid(buyerId: string, amount: number): Promise<{
        buyer: MarketParticipant;
        grid: Grid;
    }>;
    transferCoins(from: string, to: string, amount: number): Promise<void>;
}
