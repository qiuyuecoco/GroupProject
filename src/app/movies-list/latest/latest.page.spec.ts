import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPage } from './latest.page';

describe('LatestPage', () => {
  let component: LatestPage;
  let fixture: ComponentFixture<LatestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
