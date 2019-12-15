import { Component, OnInit,Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-search-course-panel',
  templateUrl: './search-course-panel.component.html',
  styleUrls: ['./search-course-panel.component.css']
})
export class SearchCoursePanelComponent implements OnInit {

   searchName:string = '';
  //  searchSemestr:boolean[]=[true,true,true,true,true,true,true,true];
   minRating:number= 0;
   maxRating:number= 10;
   minEcts:number=0;
   maxEcts:number=100;
   minSem:number=0;
   maxSem:number=7;
  @Output() propertiesAreChanged: EventEmitter<{searchName:string,minSem:number,maxSem:number,minRating:number,maxRating:number,minEcts:number,maxEcts:number}> = new EventEmitter<{searchName:string,minSem:number,maxSem:number,minRating:number,maxRating:number,minEcts:number,maxEcts:number}>();
  constructor() {
  }

  ngOnInit() {
  }

  onChangeProperties():void{
    let searchName=this.searchName;
    let minSem = this.minSem;
    let maxSem = this.maxSem;
    let minRating = this.minRating;
    let maxRating = this.maxRating;
    let minEcts = this.minEcts;
    let maxEcts = this.maxEcts;
    this.propertiesAreChanged.emit({searchName,minSem,maxSem,minRating,maxRating,minEcts,maxEcts});
  }

}
