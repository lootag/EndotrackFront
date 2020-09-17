import { Component, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Output() showDetailsEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  data = [
    {"process_id": 1, "start": "01/01/2020", "end":"02/01/2020" }
  ]
  dataSource = new MatTableDataSource<any>();
  displayColumns: Array<string> = ["process_id", "start", "end", "details"];
  showDetails: string = "Show Details";
  detailsOn: boolean = false;

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  onButtonClick(): void{
    this.detailsOn = !this.detailsOn;
    this.showDetailsEmitter.emit(this.detailsOn);
  }

}
