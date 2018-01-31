import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserCardsComponent } from './enduser-cards.component';

describe('EnduserCardsComponent', () => {
  let component: EnduserCardsComponent;
  let fixture: ComponentFixture<EnduserCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnduserCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnduserCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
