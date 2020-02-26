import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotedialogComponent } from './notedialog.component';

describe('NotedialogComponent', () => {
  let component: NotedialogComponent;
  let fixture: ComponentFixture<NotedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
