import Rating from './rating';

export interface Course {
    id: string;
    name: string;
    ects: number;
    semestr: number;
    forma: CourseForm;
    maxStudents: number;
    rating: Rating;
    desc: string;
    url: string;
 }

export enum CourseForm {
    lab = "Labolatoria",
    lec = "Wykłady",
    cla = "Ćwiczenia",
    pro = "Projekt"
}

