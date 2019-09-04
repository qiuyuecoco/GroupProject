import { FilterMoviesPipe } from './filter-movies.pipe';

describe('FilterMoviesPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterMoviesPipe();
    expect(pipe).toBeTruthy();
  });
});
