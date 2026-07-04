import { MAX_RACER } from '../../constants/racer.constant';

describe('racer constants', () => {
  it('MAX_RACER should be defined', () => {
    expect(MAX_RACER).toBeDefined();
  });

  it('MAX_RACER should be a number', () => {
    expect(typeof MAX_RACER).toBe('number');
  });

  it('MAX_RACER should be positive', () => {
    expect(MAX_RACER).toBeGreaterThan(0);
  });

  it('MAX_RACER should be 20', () => {
    expect(MAX_RACER).toBe(20);
  });

  it('MAX_RACER should be a reasonable limit for leaderboard', () => {
    expect(MAX_RACER).toBeGreaterThanOrEqual(10);
    expect(MAX_RACER).toBeLessThanOrEqual(100);
  });
});
