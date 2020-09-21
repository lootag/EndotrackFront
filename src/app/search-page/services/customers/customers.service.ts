import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { customer } from '../../models/customer.model';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  constructor(private http: HttpClient) {}
  private url: string = "https://endotrack.azurewebsites.net/api/customers/get-all-customers";
  
  observeAllCustomers(): Observable<customer[]> {
    return this.http.get<customer[]>(this.url);
  }

  
}
