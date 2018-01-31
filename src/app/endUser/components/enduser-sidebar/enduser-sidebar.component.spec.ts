import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserSidebarComponent } from './enduser-sidebar.component';

describe('EnduserSidebarComponent', () => {
  let component: EnduserSidebarComponent;
  let fixture: ComponentFixture<EnduserSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnduserSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnduserSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
