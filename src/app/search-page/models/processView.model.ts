import { Machine } from './machineInfo.model';

export class ProcessView{
    id: number; 
    processType: string;
    processTimeStart: Date;
    processTimeEnd: Date;
    waterTemp: number;
    pump10: string;
    pump5: string;
    drainSensor: string;
    waterLevelMl: number;
    machineId: number;
    machine: Machine;
}