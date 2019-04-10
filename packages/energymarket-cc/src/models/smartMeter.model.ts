import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

/** A smart meter participant communicating its readings. 
 * The 'id' of the 'SmartMeter' should be its publik key */
export class SmartMeter extends ConvectorModel<SmartMeter> {
  @ReadOnly()
  @Required()
  public readonly type = 'de.rli.hypenergy.smartMeter';

  /** Public key of the owner of the smart meter (should = 'MarketParticipant.id') */
  @Required()
  @Validate(yup.string())
  public owner: string;


  /** Smart meter reading in kWh (should be its own class since ideally it uses another identity)
   * @todo create a new class 'SmartMeter' which maps to a MarketParticipant
   */
  @Validate(yup.number())
  public read: number;

  /** Timestamp of the latest meter reading update.
   * Could be dismissed and replaced by the history() function in convector-core but easier like this
   * @todo remove timestamp and replace it by using the history() function
   */
  @Validate(yup.number())
  public timestamp: number;
}
