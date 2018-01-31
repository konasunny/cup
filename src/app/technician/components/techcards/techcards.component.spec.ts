import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechcardsComponent } from './techcards.component';

describe('TechcardsComponent', () => {
  let component: TechcardsComponent;
  let fixture: ComponentFixture<TechcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
