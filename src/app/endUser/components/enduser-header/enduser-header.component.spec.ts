import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserHeaderComponent } from './enduser-header.component';

describe('EnduserHeaderComponent', () => {
  let component: EnduserHeaderComponent;
  let fixture: ComponentFixture<EnduserHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnduserHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnduserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
