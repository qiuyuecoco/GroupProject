import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedListPage } from './watched-list.page';

describe('WatchedListPage', () => {
  let component: WatchedListPage;
  let fixture: ComponentFixture<WatchedListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
