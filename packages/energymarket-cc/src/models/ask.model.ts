import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Ask extends ConvectorModel<Ask> {
  @ReadOnly()
  @Required()
  //readonly throws a warning while coding if one tries to change this value. No effect once compiled
  public readonly type = 'de.rli.hypenergy.ask';

  /** The 'Auction' it is referring to */
  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public readonly auctionId: string;
  
  /** The public key of the asker. Not @Readonly() or @Required()  becuase it gets 
   * overwritten when calling placeAsk() to prevent inputting wrong sender fingerprint */
  @Validate(yup.string())
  public sender: string;

  /** The amount of energy in kWh the 'MarketParticipant' has to offer */ 
  @Required()
  @Validate(yup.number())
  public amount: number;

  /** The price in cent per kWh the 'MarketParticipant' wants to receive */
  @Required()
  @Validate(yup.number())
  public price: number;

  /** Will be marked as TRUE if successful and FALSE if unsuccessful */
  @Required()
  @Validate(yup.boolean())
  @Default(false)
  public successful: boolean;

  /** Unmatched amount in case of only partially matching bid */
  @Validate(yup.number())
  public unmatchedAmount: number;
}