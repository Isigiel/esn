import * as fromUserSearch from './user-search.actions';

describe('loadUserSearchs', () => {
  it('should return an action', () => {
    expect(fromUserSearch.loadUserSearchs().type).toBe(
      '[UserSearch] Load UserSearchs',
    );
  });
});
