import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StikyComponent } from './stiky.component';

describe('StikyComponent', () => {
  let component: StikyComponent;
  let fixture: ComponentFixture<StikyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StikyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StikyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
