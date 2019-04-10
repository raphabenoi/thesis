import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Bid extends ConvectorModel<Bid> {
  @ReadOnly()
  @Required()
  /** 'readonly' throws a warning while coding if one tries to change this value. No effect once compiled */
  public readonly type = 'de.rli.hypenergy.bid';

  /** The 'Auction' it is bidding on */
  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public readonly auctionId: string;
  
  /** The public key of the bidder. Not @Readonly() or @Required()  becuase it gets 
   * overwritten when calling placeBid() to prevent inputting wrong sender fingerprint */
  @Validate(yup.string())
  public sender: string;

  /** The amount of energy in kWh the 'MarketParticipant' wants to buy */ 
  @Required()
  @Validate(yup.number())
  public amount: number;

  /** The price in cent per kWh the 'MarketParticipant' is willing to pay */
  @Required()
  @Validate(yup.number())
  public price: number;

  /** Will be marked as TRUE if successful and FALSE if unsuccessful */
  @Required()
  @Validate(yup.boolean())
  @Default(false)
  public successful: boolean;

  /** Unmatched amount in case of only partially matching ask */
  @Validate(yup.number())
  public unmatchedAmount: number;
}