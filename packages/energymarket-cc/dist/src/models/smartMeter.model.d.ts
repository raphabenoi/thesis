import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class SmartMeter extends ConvectorModel<SmartMeter> {
    readonly type: string;
    owner: string;
    read: number;
    timestamp: number;
}
