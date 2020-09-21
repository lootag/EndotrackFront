import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { processInfo } from '../../models/processInfo.model';
import { ProcessQuery } from '../../models/processQuery.model';
import { Process } from '../../models/process.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {

  constructor(private http: HttpClient) { }

  processInfosUrl: string = "https://endotrack.azurewebsites.net/api/processes/get-all-processes";
  processUrl: string = "https://endotrack.azurewebsites.net/api/processes/get-processes";
  processByIdUrl: string = "https://endotrack.azurewebsites.net/api/processes/get-process";
  observeAllProcessInfos(): Observable<processInfo[]>{
    return this.http.get<processInfo[]>(this.processInfosUrl);
  }

    observeProcesses(request: ProcessQuery): Observable<processInfo[]>{
    return this.http.post<processInfo[]>(this.processUrl, request);
  }
  
  observeProcess(id: number): Observable<Process>{
    let url: string = this.processByIdUrl + '/' + id;
    return this.http.get<Process>(url);
  }
}
