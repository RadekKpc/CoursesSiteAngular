import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoursePanelComponent } from './search-course-panel.component';

describe('SearchCoursePanelComponent', () => {
  let component: SearchCoursePanelComponent;
  let fixture: ComponentFixture<SearchCoursePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCoursePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoursePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
