import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSchemaComponent } from './group-schema.component';

describe('GroupSchemaComponent', () => {
  let component: GroupSchemaComponent;
  let fixture: ComponentFixture<GroupSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
