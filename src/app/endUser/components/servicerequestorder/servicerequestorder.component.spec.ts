import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerequestorderComponent } from './servicerequestorder.component';

describe('ServicerequestorderComponent', () => {
  let component: ServicerequestorderComponent;
  let fixture: ComponentFixture<ServicerequestorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicerequestorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicerequestorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
