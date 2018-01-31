import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuProfileComponent } from './eu-profile.component';

describe('EuProfileComponent', () => {
  let component: EuProfileComponent;
  let fixture: ComponentFixture<EuProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
