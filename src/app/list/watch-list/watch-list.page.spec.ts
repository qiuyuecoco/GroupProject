import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListPage } from './watch-list.page';

describe('WatchListPage', () => {
  let component: WatchListPage;
  let fixture: ComponentFixture<WatchListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
