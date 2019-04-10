import { BaseStorage } from '@worldsibu/convector-core-storage';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';

import { Ask as AskModel } from 'energymarket-cc/dist/src';
import { Auction as AuctionModel } from 'energymarket-cc/dist/src';
import { Bid as BidModel } from 'energymarket-cc/dist/src';
import { Grid as GridModel } from 'energymarket-cc/dist/src';
import { Market as MarketModel } from 'energymarket-cc/dist/src';
import { SmartMeterReading as SmartMeterReadingModel } from 'energymarket-cc/dist/src';
import { SmartMeter as SmartMeterModel } from 'energymarket-cc/dist/src';
import { MarketParticipant as MarketParticipantModel } from 'energymarket-cc/dist/src';

export namespace Models {
  export const Ask = AskModel;
  export const Auction = AuctionModel;
  export const Bid = BidModel;
  export const Grid = GridModel;
  export const Market = MarketModel;
  export const SmartMeterReading = SmartMeterReadingModel;
  export const SmartMeter = SmartMeterModel;
  export const MarketParticipant = MarketParticipantModel;
}
