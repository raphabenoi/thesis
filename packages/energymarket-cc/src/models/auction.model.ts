import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export enum AuctionStatus {
  OPEN = 0,
  CLOSED = 1,
  CLEARED = 2,
  ESCROWED = 3
}

export class Auction extends ConvectorModel<Auction> {
  @ReadOnly()
  @Required()
  public readonly type = 'de.rli.hypenergy.auction';

  /** The status of the 'Auction' defaulting to 'OPEN = 0' */
  @Required()
  @Validate(yup.number())
  @Default(AuctionStatus.OPEN)
  public status: AuctionStatus;

  /** Start time as unix timestamp */
  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public readonly start: number;

  /** Time 'Auction' is closed for bids/asks as unix timestamp */
  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public readonly end: number;

  /** Market clearing price in cent per kWh */
  @Validate(yup.number())
  public mcp: number;

  /** Matched amount of electricity in kWh at MCP */
  @Validate(yup.number())
  public matchedAmount: number;

  /** Umatched supply in kWh */
  @Validate(yup.number())
  public unmatchedSupply: number;
  
  /** Umatched demand in kWh */
  @Validate(yup.number())
  public unmatchedDemand: number;
}
