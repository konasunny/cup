import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechScheduleComponent } from './tech-schedule.component';

describe('TechScheduleComponent', () => {
  let component: TechScheduleComponent;
  let fixture: ComponentFixture<TechScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
