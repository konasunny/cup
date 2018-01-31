import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechHeaderComponent } from './tech-header.component';

describe('TechHeaderComponent', () => {
  let component: TechHeaderComponent;
  let fixture: ComponentFixture<TechHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
