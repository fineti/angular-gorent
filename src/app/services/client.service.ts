import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../entities/client';
import {Apartment} from '../entities/apartment';
import {Host} from '../entities/host';
import {map} from 'rxjs/operators';
import {Booking} from '../entities/booking';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private httpClient: HttpClient) { }

  getClientList(): Observable<Client[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.clients)
    );
  }

  getClient(clientId: number): Observable<Client> {
    const clientUrl = `${this.baseUrl}/${clientId}`;

    return this.httpClient.get<Client>(clientUrl);
  }

  getClientBookings(clientId: number): Observable<Booking[]> {
    const clientBookingsUrl = `${this.baseUrl}/${clientId}/booking`;
    return this.httpClient.get<GetResponse>(clientBookingsUrl).pipe(
      map(response => response._embedded.bookings)
    );
  }
}

interface GetResponse {
  _embedded: {
    clients: Client[],
    bookings: Booking[]
  };
}
