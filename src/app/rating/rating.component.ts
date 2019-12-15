import { Component,Output, OnInit, Input,EventEmitter } from '@angular/core';
import Rating from '../Interfaces/rating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating: Rating;
  @Output() coursIsRating: EventEmitter<number> = new EventEmitter<number>();
  hovered =0;
  constructor() { }

  ngOnInit() {
  }

  onSaveRating(rate: number) :void{
    this.coursIsRating.emit(rate);
  }
   Round(n: number, k: number)
  {
      let factor = Math.pow(10, k);
      return Math.round(n*factor)/factor;
  }
  static getAvg(rating:Rating){
    return rating.allRatingCounter == 0 ? 0 : rating.sumRating/rating.allRatingCounter;
  }
}
