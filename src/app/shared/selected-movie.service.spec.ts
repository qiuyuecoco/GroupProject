import { TestBed } from '@angular/core/testing';

import { SelectedMovieService } from './selected-movie.service';

describe('SelectedMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedMovieService = TestBed.get(SelectedMovieService);
    expect(service).toBeTruthy();
  });
});
