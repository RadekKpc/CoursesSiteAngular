import { Course, CourseForm } from '../Interfaces/course';
import Rating from '../Interfaces/rating';

let kotek:string = 'data:image/jpeg;base64,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';

const r1: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r2: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r3: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r4: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r5: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r6: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r7: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r8: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r9: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
const r10: Rating = {sumRating : 0.0,userRating: 0,allRatingCounter: 0};
export const m1: Course = {id: 'a',name: "WDAI", ects: 1,semestr: 1,forma: CourseForm.lab,maxStudents: 30,rating: r1,desc: "sasdsa",url: kotek};
export const m2: Course = {id: 'b',name: "Angullar",ects: 2,semestr: 1,forma: CourseForm.lab,maxStudents: 35,rating: r2,desc: "sasdsa",url: kotek};
export const m3: Course = {id: 'c',name: "Fizyka",ects: 3,semestr: 2,forma: CourseForm.cla,maxStudents: 40,rating: r3,desc: "sasdsa",url: kotek};
export const m4: Course = {id: 'd',name: "Analiza I",ects: 4,semestr: 2,forma: CourseForm.cla,maxStudents: 70,rating: r4,desc: "sasdsa",url: kotek};
export const m5: Course = {id: 'e',name: "Analiza II",ects: 5,semestr: 3,forma: CourseForm.cla,maxStudents: 100,rating: r5,desc: "sasdsa",url: kotek};
export const m6: Course = {id: 'f',name: "IWIJ",ects: 6,semestr: 3,forma: CourseForm.lec,maxStudents: 30,rating: r6,desc: "sasdsa",url: kotek};
export const m7: Course = {id: 'g',name: "Statystyka",ects: 7,semestr: 4,forma: CourseForm.lec,maxStudents: 20,rating: r7,desc: "sasdsa",url: kotek};
export const m8: Course = {id: 'h',name: "Kurs Git",ects: 8,semestr: 5,forma: CourseForm.pro,maxStudents: 10,rating: r8,desc: "sasdsa",url: kotek};
export const m9: Course = {id: 'i',name: "Fizyka Labolatoria",ects: 9,semestr: 6,forma: CourseForm.pro,maxStudents: 30,rating: r9,desc: "sasdsa",url: kotek};
export const m10: Course = {id: 'j',name: "Algorytmy",ects: 30,semestr: 7,forma: CourseForm.cla,maxStudents: 40,rating: r10,desc: "sasdsa",url: kotek};

export const coursesMock = new Object();
coursesMock[m1.id]=m1;
coursesMock[m2.id]=m2;
coursesMock[m3.id]=m3;
coursesMock[m4.id]=m4;
coursesMock[m5.id]=m5;
coursesMock[m6.id]=m6;
coursesMock[m7.id]=m7;
coursesMock[m8.id]=m8;
coursesMock[m9.id]=m9;
coursesMock[m10.id]=m10;
