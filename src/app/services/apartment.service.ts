import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Apartment} from '../entities/apartment';
import {filter, map} from 'rxjs/operators';
import {Feature} from '../entities/feature';
import {Host} from '../entities/host';
import {FormControl, FormGroup} from '@angular/forms';
import {FeaturesService} from './features.service';
import {Review} from '../entities/review';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  private baseUrl = 'http://localhost:8080/api/apartments';
  nrPerson = 1;
  bookingForm = new FormGroup({
    country: new FormControl(),
    city: new FormControl(),
    dates: new FormGroup({
      checkIn: new FormControl(),
      checkOut: new FormControl()
    }),
    amenities: new FormControl(),
    facilities: new FormControl(),
    roomTypes: new FormControl(),
    petFriendly: new FormControl(),
    smokingAllowed: new FormControl()
  });

  constructor(private httpClient: HttpClient,
              private amenitiesService: FeaturesService) { }

  getApartmentListPaginate(thePage: number, thePageSize: number): Observable<GetResponse> {
    const pagUrl = `${this.baseUrl}?` + `page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponse>(pagUrl);
  }

  getApartmentList(): Observable<Apartment[]> {
    let params = new HttpParams();
    if(this.bookingForm.controls['country'] != null && this.bookingForm.controls['country'].value != null)  params = params.set('country', this.bookingForm.controls['country'].value);
    if(this.bookingForm.controls['city'] != null && this.bookingForm.controls['city'].value != null)  params = params.set('city', this.bookingForm.controls['city'].value);
    params = params.set('nrPerson', this.nrPerson.toString());
    if(this.bookingForm.controls['smokingAllowed'] != null && this.bookingForm.controls['smokingAllowed'].value != null)  params = params.set('smokingAllowed', this.bookingForm.controls['smokingAllowed'].value);
    if(this.bookingForm.controls['typeRoom'] != null && this.bookingForm.controls['typeRoom'].value != null)  params = params.set('typeRoom', this.bookingForm.controls['typeRoom'].value);
    if(this.bookingForm.controls['petFriendly'] != null && this.bookingForm.controls['petFriendly'].value != null)  params = params.set('petFriendly', this.bookingForm.controls['petFriendly'].value == null ? 'false' : 'true');
    if(this.bookingForm.controls['amenities'] != null && this.bookingForm.controls['amenities'].value != null)
      this.bookingForm.controls['amenities'].value.forEach( (value) => {
          params = params.append('amenity', value);
        }
      );
    if(this.bookingForm.controls['facilities'] != null && this.bookingForm.controls['facilities'].value != null)
      this.bookingForm.controls['facilities'].value.forEach( (value) => {
          params = params.append('facility', value);
        }
      );
    console.log(params);
    return this.httpClient.get<Apartment[]>(this.baseUrl + '/search', {params});
  }

  getApartment(apartmentId: number): Observable<Apartment> {
    const apartmentUrl = `${this.baseUrl}/${apartmentId}`;

    return this.httpClient.get<Apartment>(apartmentUrl);
  }

  getApartmentHost(apartmentId: number): Observable<Host> {
    const apartmentHostUrl = `${this.baseUrl}/${apartmentId}/host`;

    return this.httpClient.get<Host>(apartmentHostUrl);
  }

  getReviews(apartmentId: number): Observable<Review[]>  {
    const apartmentReviewsUrl = `${this.baseUrl}/${apartmentId}/apartmentReviews`;
    return this.httpClient.get<GetResponse>(apartmentReviewsUrl).pipe(
      map(response => response._embedded.apartmentReviews)
    );
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

  setFilters(bookingForm: FormGroup, nrPerson: number): void {
    this.bookingForm = bookingForm;
    this.nrPerson = nrPerson;
  }

}

interface GetResponse {
  _embedded: {
    apartments: Apartment[];
    amenities: Feature[];
    facilities: Feature[];
    apartmentReviews: Review[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}
