import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-bar',
  templateUrl: './detail-bar.component.html',
  styleUrls: ['./detail-bar.component.scss']
})
export class DetailBarComponent implements OnInit {

  @Input() open: boolean;
  @Input() position: string;
  @Input() customerName: string;
  @Input() serialNumber: number;   
  constructor() { }

  ngOnInit(): void {
    
  }

  



}
