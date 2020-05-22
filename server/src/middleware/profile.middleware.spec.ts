import { ProfileMiddleware } from './profile.middleware';

describe('ProfileMiddleware', () => {
  it('should be defined', () => {
    expect(new ProfileMiddleware()).toBeDefined();
  });
});
