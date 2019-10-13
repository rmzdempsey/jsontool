import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsoninputComponent } from './jsoninput.component';

describe('JsoninputComponent', () => {
  let component: JsoninputComponent;
  let fixture: ComponentFixture<JsoninputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsoninputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsoninputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
