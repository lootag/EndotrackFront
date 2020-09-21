import { customer } from './customer.model';

export class Machine{
    id: number;
    machineNumber: string;
    onlineFrom: Date;
    machineIdByCustomer: number;
    serialNumber: number;
    machineType: number;
    customerId: number;
    customer: customer;
}