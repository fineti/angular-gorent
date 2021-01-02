import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ApartmentService} from '../../services/apartment.service';
import {Apartment} from '../../entities/apartment';
import { Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {
  @ViewChild('card') card: ElementRef;
  apartments: Apartment[];
  width: number = 250;  // TODO: this should take initial width

  thePageNumber: number = 1;
  thePageSize: number = 9;
  theTotalElements: number = 0;

  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private apartmentService: ApartmentService,
              private router: Router) { }

  ngOnInit(): void {
    this.listApartments();
  }

  refresh(): void{
    this.ngOnInit();
  }

  listApartments(): void {
    // this.apartmentService.getApartmentListPaginate(
    //   this.thePageNumber - 1,
    //   this.thePageSize).subscribe(this.processResult());
    this.apartmentService.getApartmentList().subscribe(
      data => {
        this.apartments = data;
      }
    );
  }

  processResult() {
    return data => {
      this.apartments = data._embedded.apartments;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

}
