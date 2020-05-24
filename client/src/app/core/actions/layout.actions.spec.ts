import * as fromLayout from './layout.actions';

describe('loadLayouts', () => {
  it('should return an action', () => {
    expect(fromLayout.loadLayouts().type).toBe('[Layout] Load Layouts');
  });
});
