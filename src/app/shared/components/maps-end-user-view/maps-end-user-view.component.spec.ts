import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsEndUserViewComponent } from './maps-end-user-view.component';

describe('MapsEndUserViewComponent', () => {
  let component: MapsEndUserViewComponent;
  let fixture: ComponentFixture<MapsEndUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsEndUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsEndUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
