import { TestBed } from '@angular/core/testing';

import { CoursesServiceService } from './courses-service.service';

describe('CoursesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesServiceService = TestBed.get(CoursesServiceService);
    expect(service).toBeTruthy();
  });
});
