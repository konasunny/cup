import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsGenericComponent } from './maps-generic.component';

describe('MapsGenericComponent', () => {
  let component: MapsGenericComponent;
  let fixture: ComponentFixture<MapsGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
