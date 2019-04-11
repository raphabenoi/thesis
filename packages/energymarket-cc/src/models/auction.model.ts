import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export enum AuctionStatus {
  open = 'open',
  closed = 'closed',
  cleared = 'cleared',
  escrowed = 'escrowed'
}

export class Auction extends ConvectorModel<Auction> {
  @ReadOnly()
  @Required()
  public readonly type = 'de.rli.hypenergy.auction';

  /** The status of the 'Auction' defaulting to 'OPEN = 0' */
  @Required()
  @Validate(yup.string().oneOf(Object.keys(AuctionStatus).map(k => AuctionStatus[k])))
  @Default(AuctionStatus.open)
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
