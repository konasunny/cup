import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsTechViewComponent } from './maps-tech-view.component';

describe('MapsTechViewComponent', () => {
  let component: MapsTechViewComponent;
  let fixture: ComponentFixture<MapsTechViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsTechViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsTechViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
