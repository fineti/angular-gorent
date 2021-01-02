import {Component, Inject, OnInit} from '@angular/core';
import {Apartment} from '../../entities/apartment';
import {ApartmentService} from '../../services/apartment.service';
import {ActivatedRoute} from '@angular/router';
import {Feature} from '../../entities/feature';
import {Host} from '../../entities/host';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginService} from '../../services/login.service';
import {BookingService} from '../../services/booking.service';
import {Booking} from '../../entities/booking';
import {BookingDTO} from '../../entities/booking-dto';
import {FormControl, FormGroup} from '@angular/forms';
import {Client} from '../../entities/client';
import {Review} from '../../entities/review';
import {ReviewService} from '../../services/review.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  apartment: Apartment = new Apartment();
  idAp: number;
  imgUrls: string[] = [
    `https://images.unsplash.com/photo-1607419727375-6dd45089fced?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`,
    `https://images.unsplash.com/photo-1607453902486-555434a0403d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80`,
    `https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
    `https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
    `https://images.unsplash.com/photo-1607408982589-36efc37f105c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=673&q=80`
  ];
  amenities: Feature[];
  facilities: Feature[];
  reviews: Review[];
  host: Host = new Host();
  nrGuests: number = 1;
  nrChildren: number = 0;
  nrAdults: number = 1;

  bookingForm = new FormGroup({
      checkIn: new FormControl(),
      checkOut: new FormControl()
  });

  constructor(private apartmentService: ApartmentService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private loginService: LoginService,
              private bookingService: BookingService,
              private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.handleApartmentDetails();
    });

  }

  handleApartmentDetails() {
    // get id param and convert to number;
    const apartmentId: number = +this.route.snapshot.paramMap.get('id');

    this.apartmentService.getApartment(apartmentId).subscribe(
      data => {
        this.apartment = data;
        this.idAp = this.apartment.id;
      }
    );

    this.apartmentService.getReviews(apartmentId).subscribe(
      data => {
        this.reviews = data;
      }
    );

    this.apartmentService.getAmenities(apartmentId).subscribe(
      data => {
        this.amenities = data;
      }
    );

    this.apartmentService.getFacilities(apartmentId).subscribe(
      data => {
        this.facilities = data;
      }
    );

    this.apartmentService.getApartmentHost(apartmentId).subscribe(
      data => {
        this.host = data;
      }
    );


  }

  addTo(entity: string) {
    if (entity === 'children')
      this.nrChildren ++;
    else
      this.nrAdults ++;
    console.log(this.idAp);
    this.updateNrGuests();
  }

  subFrom(entity: string) {
    if(entity === 'children')
      this.nrChildren --;
    else
      this.nrAdults --;
    this.updateNrGuests();
  }

  updateNrGuests() {
    this.nrGuests = this.nrChildren + this.nrAdults;
  }

  onRequestBooking() {
    if(this.loginService.isLogged) {
      if(this.loginService.userType === 'client') {
        const client: Client = JSON.parse(sessionStorage.getItem('user'));
        const b = new BookingDTO(this.bookingForm.value['checkIn'], this.bookingForm.value['checkOut'], this.apartment.id, this.host.id, client.id);
        console.log(b);
        this.bookingService.create(new BookingDTO(this.bookingForm.value['checkIn'], this.bookingForm.value['checkOut'], this.apartment.id, this.host.id, client.id)).subscribe(data => {
          console.log('Booked');
        });
      }
      else {
        console.log('User must be a client');
      }
    }
    else {
      console.log('User must be looged in!');
    }
  }
}

