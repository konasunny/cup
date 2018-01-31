import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSidebarComponent } from './tech-sidebar.component';

describe('TechSidebarComponent', () => {
  let component: TechSidebarComponent;
  let fixture: ComponentFixture<TechSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
