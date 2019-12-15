import {Pipe,PipeTransform} from '@angular/core'
import {Course} from '../Interfaces/course'

@Pipe({ name: 'valuesPipe' })
export class ValuesPipe implements PipeTransform {
    transform(courses: {key,value:Course}[]): Course[]{

        if(!courses)return [];
        return courses.map(course => {
            return course.value;
        });
    }
}