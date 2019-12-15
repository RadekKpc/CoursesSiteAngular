import {Pipe,PipeTransform} from '@angular/core'
import {Course} from '../Interfaces/course'
import Rating from '../Interfaces/rating';
import { RatingComponent } from '../rating/rating.component';


@Pipe({ name: 'searchPipeSemestr' })
export class SearchPipeSemestr implements PipeTransform {
    transform(courses: Course[],minSem:number,maxSem:number): Course[]{

        if(!courses)return [];
        if(!minSem)minSem =0;
        if(!maxSem)maxSem=7;

        return courses.filter(course => {
            return (course.semestr>=minSem && course.semestr<=maxSem);
        });
    }
}

@Pipe({ name: 'searchPipeRatingRange' })
export class SearchPipeRatingRange implements PipeTransform {
    transform(courses: Course[],minRaiting:number,maxRating:number): Course[]{

        if(!courses)return [];
        if(!minRaiting)return courses;
        if(!maxRating)return courses;

        return courses.filter(course => {
            return (RatingComponent.getAvg((course.rating))>=minRaiting && RatingComponent.getAvg(course.rating)<=maxRating);
        });
    }
}

@Pipe({ name: 'searchPipeEctsRange' })
export class SearchPipeEctsRange implements PipeTransform {
    transform(courses: Course[],minEcts:number,maxEcts:number): Course[]{

        if(!courses)return [];
        if(!minEcts)minEcts =0;
        if(!maxEcts)maxEcts=32;

        return courses.filter(course => {
            return (course.ects>=minEcts && course.ects<=maxEcts);
        });
    }
}

@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {
    transform(courses: Course[], searchText: string): Course[]{

        if(!courses)return [];

        if (!searchText)return courses;

        searchText = searchText.toLowerCase();

        return courses.filter(course => {
            return (course.name.toLowerCase().includes(searchText));
        });
    }
}