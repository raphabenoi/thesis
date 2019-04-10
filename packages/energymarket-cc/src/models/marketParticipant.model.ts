import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import { defaultCipherList } from 'constants';
import { ListenOptions } from 'net';

export enum ParticipantType {
  prdoducer = 'producer',
  consumer = 'consumer',
  prosumer = 'prosumer'
}

export class SmartMeterReading extends ConvectorModel<SmartMeterReading>{
  @ReadOnly()
  public readonly type = 'de.rli.hypenergy.smartMeterReading';

  /** Eventually this can left out and the ID is the Auction period */
  @Required()
  @Validate(yup.string())
  public auctionPeriod: string;

  @Required()
  @Validate(yup.number())
  @Default(0)
  public consumed: number;

  @Required()
  @Validate(yup.number())
  @Default(0)
  public produced: number;
}

// export class SmartMeterData {
//   public auctionPeriod: string;
//   public data: number;
//   constructor(auctionPeriod, data) {
//     this.auctionPeriod = auctionPeriod;
//     this.data = data;
//   }
// }


export class MarketParticipant extends ConvectorModel<MarketParticipant> {
  @ReadOnly()
  @Required()
  public readonly type = 'de.rli.hypenergy.marketParticipant';

  /**  Name of the participant (can be the same as id) */
  @Required()
  @Validate(yup.string())
  public name: string;

  /** What type of market participant */
  @Required()
  @Validate(yup.string().oneOf(Object.keys(ParticipantType).map(k => ParticipantType[k])))
  public is: ParticipantType;

  /** Coin balance where 1 coin = 1 euro cent = 0.01 euro */
  @Required()
  @Validate(yup.number())
  @Default(0)
  public coinBalance: number;

  /** Frozen coins cannot be accessed by 'MarketParticipant' and only managed by chaincode */
  @Required()
  @Validate(yup.number())
  @Default(0)
  public frozenCoins: number;

  /** Energy balance in kWh where + = production and - = consumption */
  @Required()
  @Validate(yup.number())
  @Default(0)
  public energyBalance: number;

  /** Smart meter reading after the consumption/production for an auction period has been realized */
  @Required()
  @Validate(yup.lazy(() => yup.array(SmartMeterReading.schema())))
  @Default(new Array<SmartMeterReading>())
  public readings: Array<FlatConvectorModel<SmartMeterReading>>;
}
