import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { machineInfo } from '../../models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  constructor(private http: HttpClient) { }
  url: string = "https://endotrack.azurewebsites.net/api/machines/get-all-machines";

  observeAllMachines(): Observable<machineInfo[]>{
    return this.http.get<machineInfo[]>(this.url);
  }

}
