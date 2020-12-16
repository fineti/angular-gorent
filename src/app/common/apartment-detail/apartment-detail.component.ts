import {Component, Inject, OnInit} from '@angular/core';
import {Apartment} from '../../entities/apartment';
import {ApartmentService} from '../../services/apartment.service';
import {ActivatedRoute} from '@angular/router';
import {Feature} from '../../entities/feature';
import {Host} from '../../entities/host';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  apartment: Apartment = new Apartment();
  imgUrls: string[] = [
    `https://images.unsplash.com/photo-1607419727375-6dd45089fced?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`,
    `https://images.unsplash.com/photo-1607453902486-555434a0403d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80`,
    `https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
    `https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
    `https://images.unsplash.com/photo-1607408982589-36efc37f105c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=673&q=80`
  ];
  amenities: Feature[];
  facilities: Feature[];
  host: Host = new Host();
  nrGuests: number = 1;
  nrChildren: number = 0;
  nrAdults: number = 1;

  constructor(private apartmentService: ApartmentService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

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
}

