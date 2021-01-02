import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FeaturesService} from '../services/features.service';
import {Feature} from '../entities/feature';
import {TypeRoom} from '../entities/type-room';
import {Apartment} from '../entities/apartment';
import {ApartmentService} from '../services/apartment.service';
import {ApartmentListComponent} from '../components/apartment-list/apartment-list.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  nrGuests: number = 1;
  nrChildren: number = 0;
  nrAdults: number = 1;


  amenitiesStringList: string[] = [];


  facilitiesStringList: string[] = [];


  roomTypesStringList: string[] = ['House','Bungalow' ,'Hostel','Loft','Villa'
    ,'Apartment','Cabin','Hotel','Resort','Boutique','Townhouse','Treehouse'];

  // amenities = new FormControl();
  // facilities = new FormControl();
  // roomTypes = new FormControl();

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

  @ViewChild(ApartmentListComponent) private apartmentListComponent:
    ApartmentListComponent;

  constructor(private featuresService: FeaturesService,
              private apartmentService: ApartmentService) { }

  ngOnInit(): void {
    this.listAmenities();
    this.listFacilities();
    this.listRoomTypes();
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

  listAmenities(): void {
    this.featuresService.getAmenitiesList().subscribe(
      data => {
        const amenitiesList: Feature[] = data;
        for (let i = 0; i < amenitiesList.length; i ++)
          this.amenitiesStringList.push(amenitiesList[i].name);
      }
    );
  }

  listFacilities(): void {
    this.featuresService.getFacilitiesList().subscribe(
      data => {
        const facilitiesList: Feature[] = data;
        for (let i = 0; i < facilitiesList.length; i ++)
          this.facilitiesStringList.push(facilitiesList[i].name);
      }
    );
  }

  listRoomTypes(): void {
    this.featuresService.getRoomTypesList().subscribe(
      data => {
        const roomTypesList: TypeRoom[] = data;
        // for (let i = 0; i < roomTypesList.length; i ++)
        //   this.roomTypesStringList.push(roomTypesList[i].typeName);
      }
    );
    console.log(this.roomTypesStringList.length);
  }

  onSubmitSearch() {
    this.apartmentService.setFilters(this.bookingForm, this.nrGuests);
    this.apartmentListComponent.refresh();
    console.log(this.bookingForm);
  }
}
