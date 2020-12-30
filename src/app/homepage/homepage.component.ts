import { Component, OnInit } from '@angular/core';
import {Apartment} from '../entities/apartment';
import {ApartmentService} from '../services/apartment.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  popularApartments: Apartment[];
  width: number = 350;  // TODO: this should take initial width

  constructor(private apartmentService: ApartmentService) { }

  ngOnInit(): void {
    this.listApartments();
  }

  listApartments(): void {
    this.apartmentService.getApartmentList().subscribe(
      data => {
        this.popularApartments = data.slice(0, 4);
      }
    );
  }

}
