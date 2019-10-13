import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsontreeComponent } from './jsontree.component';

describe('JsontreeComponent', () => {
  let component: JsontreeComponent;
  let fixture: ComponentFixture<JsontreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsontreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsontreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
