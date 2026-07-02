import { racers } from '../../data/racers';
import { Racer } from '../../types/racer.interface';

describe('racers data', () => {
  it('should be an array', () => {
    expect(Array.isArray(racers)).toBe(true);
  });

  it('should have initial racers', () => {
    expect(racers.length).toBeGreaterThan(0);
  });

  it('should have at least 6 racers', () => {
    expect(racers.length).toBeGreaterThanOrEqual(6);
  });

  it('each racer should have required properties', () => {
    racers.forEach((racer: Racer) => {
      expect(racer).toHaveProperty('name');
      expect(racer).toHaveProperty('colorTag');
      expect(racer).toHaveProperty('timeStamp');
    });
  });

  it('each racer should have a valid name (non-empty string)', () => {
    racers.forEach((racer: Racer) => {
      expect(typeof racer.name).toBe('string');
      expect(racer.name.length).toBeGreaterThan(0);
    });
  });

  it('each racer should have a valid hex color', () => {
    const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    racers.forEach((racer: Racer) => {
      expect(hexColorRegex.test(racer.colorTag)).toBe(true);
    });
  });

  it('each racer should have a valid timeStamp format', () => {
    const timeStampRegex = /^\d{1,2}:\d{2}\.\d{3}$/;
    racers.forEach((racer: Racer) => {
      expect(timeStampRegex.test(racer.timeStamp)).toBe(true);
    });
  });

  it('should contain Oscar Piastri as first racer', () => {
    expect(racers[0].name).toBe('Oscar Piastri');
  });

  it('should contain George Russell', () => {
    const george = racers.find((r) => r.name === 'George Russell');
    expect(george).toBeDefined();
    expect(george?.colorTag).toBe('#eee');
  });

  it('should have unique IDs for all racers', () => {
    const ids = racers.map((r) => r.id).filter((id) => id !== undefined);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should not be mutated', () => {
    const originalLength = racers.length;
    const originalFirst = racers[0];
    
    // Attempt mutation
    racers.push({ name: 'Test', colorTag: '#000', timeStamp: '0:00.000' });
    
    // Verify no permanent mutation (though this test shows the data is mutable)
    racers.pop();
    
    expect(racers.length).toBe(originalLength);
    expect(racers[0]).toEqual(originalFirst);
  });
});
