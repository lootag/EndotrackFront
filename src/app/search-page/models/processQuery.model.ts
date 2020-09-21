export class ProcessQuery {
    
    public constructor(waterTempMin: number,
                waterTempMax: number,
                pump10: boolean,
                pump5: boolean,
                drainSensor: boolean,
                waterLevelMin: number,
                waterLevelMax: number,
                machineIds: number[],
                customerIds: number[]){
        
        this.waterTempMin = waterTempMin;
        this.waterTempMax = waterTempMax;
        this.pump10 = pump10;
        this.pump5 = pump5;
        this.drainSensor = drainSensor;
        this.waterLevelMin = waterLevelMin;
        this.waterLevelMax = waterLevelMax;
        this.machineIds = machineIds;
        this.customerIds = customerIds;
        
    }

    waterTempMin: number;
    waterTempMax: number;
    pump10: boolean;
    pump5: boolean;
    drainSensor: boolean;
    waterLevelMin: number;
    waterLevelMax: number;
    machineIds: number[];
    customerIds: number[];
}