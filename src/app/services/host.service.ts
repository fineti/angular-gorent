import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Host} from '../entities/host';
import {HttpClient} from '@angular/common/http';
import {Apartment} from '../entities/apartment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private httpClient: HttpClient) { }

  getHost(hostId: number): Observable<Host> {
    const hostUrl = `${this.baseUrl}/${hostId}`;

    return this.httpClient.get<Host>(hostUrl);
  }

  getApartments(hostId: number): Observable<Apartment[]> {
    const hostApartmentsUrl = `${this.baseUrl}/${hostId}/apartments`;
    return this.httpClient.get<GetResponse>(hostApartmentsUrl).pipe(
      map(response => response._embedded.apartments)
    );
  }
}

interface GetResponse {
  _embedded: {
    hosts: Host[];
    apartments: Apartment[];
  };
}
