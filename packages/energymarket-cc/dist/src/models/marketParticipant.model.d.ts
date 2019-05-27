import { ConvectorModel, FlatConvectorModel } from '@worldsibu/convector-core-model';
export declare enum ParticipantType {
    producer = "producer",
    consumer = "consumer",
    prosumer = "prosumer",
    lmo = "lmo"
}
export declare class SmartMeterReading extends ConvectorModel<SmartMeterReading> {
    readonly type: string;
    auctionPeriod: string;
    consumed: number;
    produced: number;
}
export declare class MarketParticipant extends ConvectorModel<MarketParticipant> {
    readonly type: string;
    fingerprint: string;
    is: ParticipantType;
    coinBalance: number;
    frozenCoins: number;
    energyBalance: number;
    readings: Array<FlatConvectorModel<SmartMeterReading>>;
}
