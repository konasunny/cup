import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewworkorderComponent } from './newworkorder.component';

describe('NewworkorderComponent', () => {
  let component: NewworkorderComponent;
  let fixture: ComponentFixture<NewworkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewworkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewworkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
