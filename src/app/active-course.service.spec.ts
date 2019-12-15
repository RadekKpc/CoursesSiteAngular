import { TestBed } from '@angular/core/testing';

import { ActiveCourseService } from './active-course.service';

describe('ActiveCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveCourseService = TestBed.get(ActiveCourseService);
    expect(service).toBeTruthy();
  });
});
