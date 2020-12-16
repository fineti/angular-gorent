import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../entities/client';
import {Apartment} from '../entities/apartment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private httpClient: HttpClient) { }

  getClient(clientId: number): Observable<Client> {
    const clientUrl = `${this.baseUrl}/${clientId}`;

    return this.httpClient.get<Client>(clientUrl);
  }
}
