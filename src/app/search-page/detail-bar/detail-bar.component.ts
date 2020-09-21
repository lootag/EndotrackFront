import { Component, Input, OnInit } from '@angular/core';
import { faHospital, faBarcode, faThermometer, faWater, faPumpMedical, faLightbulb, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from 'rxjs';
import { ProcessView } from '../models/processView.model';

@Component({
  selector: 'app-detail-bar',
  templateUrl: './detail-bar.component.html',
  styleUrls: ['./detail-bar.component.scss']
})
export class DetailBarComponent implements OnInit {

  @Input() open: boolean;
  @Input() position: string; 
  @Input() process: ProcessView;
  @Input() isLoading: BehaviorSubject<boolean>;
  faHospital = faHospital;
  faBarCode = faBarcode;
  faThermometer = faThermometer;
  faWater = faWater;
  faMicrochip = faMicrochip;
  faLightBulb = faLightbulb;
  showBackDrop: boolean = false;
  constructor() { }

  ngOnInit(): void {
  
  }


  



}
