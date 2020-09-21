import { Machine } from './machineInfo.model';
import { ProcessType } from './processType.enum';

export class Process{

    constructor() {
        
        
    }

    id: number; 
    processType: ProcessType;
    processTimeStart: Date;
    processTimeEnd: Date;
    waterTemp: number;
    pump10: boolean;
    pump5: boolean;
    drainSensor: boolean;
    waterLevelMl: number;
    machineId: number;
    machine: Machine;
}