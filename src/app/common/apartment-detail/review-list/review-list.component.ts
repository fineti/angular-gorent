import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../../entities/apartment';
import {ApartmentService} from '../../../services/apartment.service';
import {Review} from '../../../entities/review';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../../../entities/client';
import {ReviewService} from '../../../services/review.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login.service';
import {ReviewDTO} from '../../../entities/review-dto';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input()
  reviews: Review[] = [];
  @Input()
  apartmentId: number = 1;
  author: Client[] = [];
  nr = 3;


  reviewForm = new FormGroup({
      rating: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    }
  );


  constructor(private reviewService: ReviewService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.reviews.length; i++) {
      this.reviewService.getReviewClient(this.reviews[i].id).subscribe(
        author => {
          this.author.push(author);
        }
      );
    }
  }


  onSubmitReview() {
    const newReview: Review = new Review();
    newReview.rating = this.reviewForm.value['rating'];
    newReview.description = this.reviewForm.value['description'];
    const postReview = new ReviewDTO(newReview.description, newReview.rating, this.apartmentId, this.loginService.client.id);
    console.log(postReview);
    this.reviewService.create(postReview).subscribe(
      data => {
        console.log('Review posted');
      }
    );

    //update list
    this.reviews.push(newReview);
    this.author.push(this.loginService.client);
  }

  isClientLogged() {
    return  this.loginService.isLogged && this.loginService.userType === 'client';
  }
}
