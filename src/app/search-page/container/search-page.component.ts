import { Component, OnInit } from '@angular/core';
import { Options } from "ng5-slider";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor() { }
  open: boolean = false;
  position: string = "right";
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1000,
    allowSearchFilter: true
  };
  customers: string[] = ["john", "judy", "albert"];
  serialNumbers: number[] = [123, 345, 456];
  minValue: number = 20;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  ngOnInit(): void {
  }

  toggleSideBar(event): void{
    this.open = event;
  }

}
