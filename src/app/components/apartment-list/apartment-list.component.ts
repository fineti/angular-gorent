import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApartmentService} from '../../services/apartment.service';
import {Apartment} from '../../entities/apartment';
import { Router} from '@angular/router';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {
  @ViewChild('card') card: ElementRef;
  apartments: Apartment[];
  width: number = 250;  // TODO: this should take initial width

  constructor(private apartmentService: ApartmentService,
              private router: Router) { }

  ngOnInit(): void {
    this.listApartments();
  }

  listApartments(): void {
    this.apartmentService.getApartmentList().subscribe(
      data => {
        this.apartments = data;
      }
    );
  }

}
