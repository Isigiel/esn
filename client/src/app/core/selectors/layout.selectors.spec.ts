import * as fromLayout from '../reducers/layout.reducer';
import { selectLayoutState } from './layout.selectors';

describe('Layout Selectors', () => {
  it('should select the feature state', () => {
    const result = selectLayoutState({
      [fromLayout.layoutFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
