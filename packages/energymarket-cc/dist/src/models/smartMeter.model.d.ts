import { ConvectorModel } from '@worldsibu/convector-core-model';
export declare class SmartMeter extends ConvectorModel<SmartMeter> {
    readonly type = "de.rli.hypenergy.smartMeter";
    owner: string;
    read: number;
    timestamp: number;
}
