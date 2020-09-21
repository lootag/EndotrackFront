import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Options } from "ng5-slider";
import { BehaviorSubject } from 'rxjs';
import { customer } from '../models/customer.model';
import { machineInfo } from '../models/machine.model';
import { Machine } from '../models/machineInfo.model';
import { Process } from '../models/process.model';
import { processInfo } from '../models/processInfo.model';
import { ProcessType } from '../models/processType.enum';
import { ProcessView } from '../models/processView.model';
import { CustomersService } from '../services/customers/customers.service';
import { MachinesService } from '../services/machines/machines.service';
import { ProcessesService } from '../services/processes/processes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {

  constructor(private customersService: CustomersService,
              private machinesService: MachinesService,
              private processesService: ProcessesService) { }

  detailsOpen: boolean = false;
  filtersOpen: boolean = false;
  detailsPosition: string = "right";
  filtersPosition: string = "left";
  isLoadingCustomers: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingMachines: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingProcessInfos: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingProcess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  processRetrieved: ProcessView = new ProcessView();
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1000,
    allowSearchFilter: true
  };
  customers: customer[] = [];
  machineInfos : machineInfo[] = [];
  processInfos : processInfo[] = [];
  gridData: Array<processInfo> = new Array<processInfo>();
  gridDataSource: MatTableDataSource<processInfo> = new MatTableDataSource<processInfo>();
  minValue: number = 20;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllMachines();
    this.getAllProcessInfos();
    let machine: Machine = new Machine();
    machine.customer = new customer();
    this.processRetrieved.machine = machine;

  }

  toggleDetails(event): void{
    this.isLoadingProcess.next(true);
    this.detailsOpen = event.sideBarPosition;
    this.processesService.observeProcess(event.id).subscribe(
      data => {
        this.processRetrieved = this.processToProcessView(data);
        this.isLoadingProcess.next(false);
      },
      error => {
        console.log(error);
      }
    )
  }

  toggleFilters(): void{
    this.detailsOpen = false;
    this.filtersOpen = !this.filtersOpen;
    console.log(this.filtersOpen);
  }

  getAllCustomers() {
    this.isLoadingCustomers.next(true);
    console.log("waiting for customers to be loaded...")
    this.customersService.observeAllCustomers().subscribe(
      data => {
        this.customers = data;
        this.isLoadingCustomers.next(false);
      },

      error => {
        console.log(error)
      }
     
    )
  }

  getAllMachines(){
    this.isLoadingMachines.next(true);
    console.log("waiting for machines to be loaded...");
    this.machinesService.observeAllMachines().subscribe(
      data => {
        this.machineInfos = data;
        this.isLoadingMachines.next(false);
      },
      error => {
        console.log(error);
      }

    )
    
  }

  getAllProcessInfos(){
    this.isLoadingProcessInfos.next(true);
    this.processesService.observeAllProcessInfos().subscribe(
      data => {
        this.gridData = this.preprocessProcessInfo(data);
        this.gridDataSource.data = this.gridData;
        this.isLoadingProcessInfos.next(false);
      },

      error => {
        console.log(error);
      }
    )
  }


  getAllCustomerNames(): string[]{
    let allCustomers: string[] = this.customers.map(customer => customer.name);
    return allCustomers.filter(this.unique);
  }

  getAllSerialNumbers(): number[]{
    return this.machineInfos.map(machineInfo => machineInfo.serialNumber);
  }

  unique(value, index, self): boolean{
    return self.indexOf(value) == index;
  }

  onFiltersEmit(event): void{
    this.filtersOpen = false;
    this.isLoadingProcessInfos.next(true);
    this.gridDataSource.data = this.preprocessProcessInfo(event);
    this.isLoadingProcessInfos.next(false);
  }

  processToProcessView(process: Process): ProcessView{    
    let processView: ProcessView = new ProcessView();
    processView.pump10 = "off";
    processView.pump5 = "off";
    processView.drainSensor = "off";
    processView.machine = process.machine;
    processView.id = process.id;
    processView.machineId = process.machineId;
    processView.processTimeStart = process.processTimeStart;
    processView.processTimeEnd = process.processTimeEnd;
    processView.processType = ProcessType[process.processType];
    processView.waterTemp = process.waterTemp;
    processView.waterLevelMl = process.waterLevelMl;
    if(process.pump10){
      processView.pump10 = "on";
    }
    if(process.pump5){
      processView.pump5 = "on";
    }
    if(process.drainSensor){
      processView.drainSensor = "on";
    }

    return processView;
  }

  onCancelFilters(): void{
    this.filtersOpen = false;
  }

  removeFilters(): void{
    this.getAllProcessInfos();
  }

  preprocessProcessInfo(processInfos: processInfo[]): processInfo[]{
    let processedProcessInfos: processInfo[] = [];
    for(var i = 0; i < processInfos.length; i++){
      let processedProcessInfo: processInfo = processInfos[i];
      processedProcessInfo.processTimeStart = processedProcessInfo.processTimeStart.replace("T", " ");
      processedProcessInfo.processTimeEnd = processedProcessInfo.processTimeEnd.replace("T", " ");
      processedProcessInfos.push(processedProcessInfo);
    }
    return processedProcessInfos;
  }


}
