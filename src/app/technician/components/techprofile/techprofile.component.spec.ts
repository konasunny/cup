import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechprofileComponent } from './techprofile.component';

describe('TechprofileComponent', () => {
  let component: TechprofileComponent;
  let fixture: ComponentFixture<TechprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
