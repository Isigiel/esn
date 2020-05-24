import * as fromSection from './section.actions';

describe('loadSections', () => {
  it('should return an action', () => {
    expect(fromSection.loadSections().type).toBe('[Section] Load Sections');
  });
});
