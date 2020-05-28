import * as fromViewEventPage from './view-event-page.actions';

describe('loadViewEventPages', () => {
  it('should return an action', () => {
    expect(fromViewEventPage.loadViewEventPages().type).toBe(
      '[ViewEventPage] Load ViewEventPages',
    );
  });
});
