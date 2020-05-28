import * as fromEvent from './event.actions';

describe('loadEvents', () => {
  it('should return an action', () => {
    expect(fromEvent.loadEvents().type).toBe('[Event] Load Events');
  });
});
