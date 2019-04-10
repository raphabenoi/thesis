import { ConvectorModel, FlatConvectorModel } from '@worldsibu/convector-core-model';
export declare enum ParticipantType {
    prdoducer = "producer",
    consumer = "consumer",
    prosumer = "prosumer"
}
export declare class SmartMeterReading extends ConvectorModel<SmartMeterReading> {
    readonly type = "de.rli.hypenergy.smartMeterReading";
    auctionPeriod: string;
    consumed: number;
    produced: number;
}
export declare class MarketParticipant extends ConvectorModel<MarketParticipant> {
    readonly type = "de.rli.hypenergy.marketParticipant";
    name: string;
    is: ParticipantType;
    coinBalance: number;
    frozenCoins: number;
    energyBalance: number;
    readings: Array<FlatConvectorModel<SmartMeterReading>>;
}
