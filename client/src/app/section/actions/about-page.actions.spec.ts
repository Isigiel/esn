import * as fromAboutPage from './about-page.actions';

describe('loadAboutPages', () => {
  it('should return an action', () => {
    expect(fromAboutPage.loadAboutPages().type).toBe('[AboutPage] Load AboutPages');
  });
});
