import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTodoComponent } from './tech-todo.component';

describe('TechTodoComponent', () => {
  let component: TechTodoComponent;
  let fixture: ComponentFixture<TechTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
