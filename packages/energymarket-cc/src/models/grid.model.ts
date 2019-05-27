import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Grid extends ConvectorModel<Grid> {
  @ReadOnly()
  @Required()
  public readonly type = 'de.rli.hypenergy.grid';

  /**  Fingerprint (similar to public key) of the grid party */
  @Validate(yup.string())
  public fingerprint: string;

  /** Coin balance where 1 coin = 1 euro cent = 0.01 euro */
  @Required()
  @Validate(yup.number())
  @Default(0)
  public coinBalance: number;

  /** Energy balance in kWh where + = production and - = consumption */
  @Required()
  @Validate(yup.number())
  @Default(0)
  public energyBalance: number;

   /** Price at which the local market can buy electricity from the 'PUBLICGRID' */
   @Required()
   @Validate(yup.number())
   public gridBuyPrice: number;
 
   /** Price at which the local market can sell electricity to the 'PUBLICGRID' */
   @Required()
   @Validate(yup.number())
   public gridSellPrice: number;
}
