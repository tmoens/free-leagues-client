import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TLComponent } from './tl.component';

describe('TLComponent', () => {
  let component: TLComponent;
  let fixture: ComponentFixture<TLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
