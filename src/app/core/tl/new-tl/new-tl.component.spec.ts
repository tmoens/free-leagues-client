import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTlComponent } from './new-tl.component';

describe('NewTlComponent', () => {
  let component: NewTlComponent;
  let fixture: ComponentFixture<NewTlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
