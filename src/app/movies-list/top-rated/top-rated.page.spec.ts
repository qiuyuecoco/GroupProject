import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedPage } from './top-rated.page';

describe('TopRatedPage', () => {
  let component: TopRatedPage;
  let fixture: ComponentFixture<TopRatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRatedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
