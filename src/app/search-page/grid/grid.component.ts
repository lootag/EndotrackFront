import { Component, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';
import { processInfo } from '../models/processInfo.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Output() showDetailsEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  @Input() dataSource = new MatTableDataSource<processInfo>();
  displayColumns: Array<string> = ["id", "processTimeStart", "processTimeEnd", "details"];
  showDetails: string = "Show Details";
  detailsOn: boolean = false;
  selectedItem: number = 0;

  ngOnInit(): void {
  
  }

  onButtonClick(index: number): void{
    this.detailsOn = !this.detailsOn;
    this.selectedItem = index;
    this.showDetailsEmitter.emit({"sideBarPosition" : this.detailsOn, "id": this.dataSource.data[index].id});
  }

}
