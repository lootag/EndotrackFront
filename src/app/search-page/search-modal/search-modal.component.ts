import { Component, Input, OnInit, Output } from '@angular/core';
import { faHospital, faBarcode, faThermometer, faWater, faPumpMedical, faLightbulb, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { Options } from 'ng5-slider';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { customer } from '../models/customer.model';
import { machineInfo } from '../models/machine.model';
import { processInfo } from '../models/processInfo.model';
import { CustomersService } from '../services/customers/customers.service';
import { MachinesService } from '../services/machines/machines.service';
import { ProcessesService } from '../services/processes/processes.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProcessQuery } from '../models/processQuery.model';


@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit{

  constructor(private customersService: CustomersService,
              private machinesService: MachinesService,
              private processesService: ProcessesService,
              private formBuilder: FormBuilder) { }

  @Input() open: boolean;
  @Input() position: string;
  @Input() customerName: string;
  @Input() serialNumber: number;   
  @Output() filtersEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter<any>();
  faHospital = faHospital;
  faBarCode = faBarcode;
  faThermometer = faThermometer;
  faWater = faWater;
  faMicrochip = faMicrochip;
  showBackDrop: boolean = false;
  isLoadingCustomers: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingMachines: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
  minValue: number = 20;
  maxValueLevel: number = 500;
  maxValueTemp: number = 100;
  optionsWaterLevel: Options = {
    floor: 0,
    ceil: 500
  };
  optionsWaterTemp: Options = {
    floor: 0,
    ceil: 100
  }

  pump10Enabled: boolean = true;
  pump5Enabled: boolean = true;
  drainSensorEnabled: boolean = true;
  processQueryForm: FormGroup;

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllMachines();
    this.buildProcessQueryForm();
    this.pump10.setValue(false);
    this.pump5.setValue(false);
    this.drainSensor.setValue(false);
  }

  buildProcessQueryForm(): void{
    this.processQueryForm = this.formBuilder.group({
      waterTempRange: ['',[]],
      pump10: ['',[]],
      pump5: ['',[]],
      drainSensor: ['',[]],
      waterLevelRange: ['',[]],
      serialNumber: ['',[]],
      customerName: ['',[]]
    })
  }

  get waterTempRange(){
    return this.processQueryForm.get('waterTempRange');
  }
  get pump10(){
    return this.processQueryForm.get('pump10');
  }

  get pump5(){
    return this.processQueryForm.get('pump5');
  }

  get drainSensor(){
    return this.processQueryForm.get('drainSensor');
  }

  get waterLevelRange(){
    return this.processQueryForm.get('waterLevelRange');
  }

  get serialNumberForm(){
    return this.processQueryForm.get('serialNumber');
  }

  get customerNameForm(){
    return this.processQueryForm.get('customerName');
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

  onButtonClick(): void{
    console.log(this.customerNameForm.value);
    console.log(this.serialNumberForm.value);
    let pump10: boolean = null;
    let pump5: boolean = null;
    let drainSensor: boolean = null;
    if(this.pump10Enabled){
      pump10 = this.pump10.value;
    }
    if(this.pump10Enabled){
      pump5 = this.pump5.value;
    }
    if(this.pump10Enabled){
      drainSensor = this.drainSensor.value;
    }
    let customerIds: number[] = this.customers.filter(customer => this.customerNameForm.value.includes(customer.name))
                                              .map(customer => customer.id);

    let machineIds: number[] = this.machineInfos.filter(machine => this.serialNumberForm.value.includes(machine.serialNumber))
                                                .map(machine => machine.id);
    let processQuery: ProcessQuery = new ProcessQuery(this.waterTempRange.value[0],
                                                      this.waterTempRange.value[1],
                                                      pump10,
                                                      pump5,
                                                      drainSensor,
                                                      this.waterLevelRange.value[0],
                                                      this.waterLevelRange.value[1],
                                                      machineIds,
                                                      customerIds,);
    this.processesService.observeProcesses(processQuery).subscribe(
      data => {
        this.filtersEmitter.emit(data);
        console.log(data);
      },

      error => console.log(error)
    );



  }

  onCancel(){
    this.cancelEmitter.emit();
  }
  

}
