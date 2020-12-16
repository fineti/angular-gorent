import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apartment} from '../entities/apartment';
import {map} from 'rxjs/operators';
import {Feature} from '../entities/feature';
import {Host} from '../entities/host';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  private baseUrl = 'http://localhost:8080/api/apartments';

  constructor(private httpClient: HttpClient) { }

  getApartmentList(): Observable<Apartment[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.apartments)
    );
  }

  getApartment(apartmentId: number): Observable<Apartment> {
    const apartmentUrl = `${this.baseUrl}/${apartmentId}`;

    return this.httpClient.get<Apartment>(apartmentUrl);
  }

  getApartmentHost(apartmentId: number): Observable<Host> {
    const apartmentHostUrl = `${this.baseUrl}/${apartmentId}/host`;

    return this.httpClient.get<Host>(apartmentHostUrl);
  }

  getAmenities(apartmentId: number): Observable<Feature[]>  {
    const apartmentAmenitiesUrl = `${this.baseUrl}/${apartmentId}/amenities`;
    return this.httpClient.get<GetResponse>(apartmentAmenitiesUrl).pipe(
      map(response => response._embedded.amenities)
    );
  }

  getFacilities(apartmentId: number): Observable<Feature[]>  {
    const apartmentFacilitiesUrl = `${this.baseUrl}/${apartmentId}/facilities`;
    return this.httpClient.get<GetResponse>(apartmentFacilitiesUrl).pipe(
      map(response => response._embedded.facilities)
    );
  }
}

interface GetResponse {
  _embedded: {
    apartments: Apartment[];
    amenities: Feature[];
    facilities: Feature[];
  };
}
