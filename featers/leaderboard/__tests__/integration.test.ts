import { toMillisecond } from '../utils/toMillisecond';
import { toTimeStampForm } from '../utils/toTimeStampForm';
import { racers } from '../data/racers';
import { Racer } from '../types/racer.interface';
import { MAX_RACER } from '../constants/racer.constant';

describe('Leaderboard Integration Tests', () => {
  describe('Adding a new racer flow', () => {
    it('should process a new racer through the complete flow', () => {
      // Step 1: Create a new racer with OTP input (6-digit format)
      const newRacerInput = '133500'; // User input from OTP
      
      // Step 2: Convert OTP format to timestamp format
      const formattedTime = toTimeStampForm(newRacerInput);
      expect(formattedTime).toBe('1:33.500');
      
      // Step 3: Create racer object
      const newRacer: Racer = {
        id: racers.length + 1,
        name: 'Test Driver',
        colorTag: '#ff0000',
        timeStamp: formattedTime,
      };
      
      expect(newRacer.name).toBe('Test Driver');
      expect(newRacer.timeStamp).toBe('1:33.500');
    });

    it('should sort racers by time correctly after adding new racer', () => {
      const racersWithNew = [...racers];
      
      const newRacer: Racer = {
        id: racersWithNew.length + 1,
        name: 'Fast Driver',
        colorTag: '#00ff00',
        timeStamp: '1:33.000', // Faster than Oscar Piastri's 1:33.643
      };
      
      racersWithNew.push(newRacer);
      
      // Sort by converting to milliseconds
      const sorted = racersWithNew.sort((a, b) =>
        toMillisecond(a.timeStamp) - toMillisecond(b.timeStamp)
      );
      
      // Fast Driver should be first
      expect(sorted[0].name).toBe('Fast Driver');
      expect(sorted[0].timeStamp).toBe('1:33.000');
    });
  });

  describe('Leaderboard constraints', () => {
    it('should not allow more than MAX_RACER racers', () => {
      expect(racers.length).toBeLessThanOrEqual(MAX_RACER);
    });

    it('should validate that MAX_RACER is a reasonable limit', () => {
      expect(MAX_RACER).toBe(20);
    });
  });

  describe('Time formatting and comparison', () => {
    it('should correctly identify faster and slower times', () => {
      const fasterTime = toMillisecond('1:33.000');
      const slowerTime = toMillisecond('1:34.000');
      
      expect(fasterTime).toBeLessThan(slowerTime);
    });

    it('should maintain time format consistency', () => {
      const original = '133500';
      const formatted = toTimeStampForm(original);
      const milliseconds = toMillisecond(formatted);
      
      expect(formatted).toBe('1:33.500');
      expect(milliseconds).toBe(93500);
    });

    it('should handle edge case times', () => {
      const veryFast = toTimeStampForm('010000'); // 0:10.000
      const verySlow = toTimeStampForm('595959'); // 5:95.959
      
      const fastMs = toMillisecond(veryFast);
      const slowMs = toMillisecond(verySlow);
      
      expect(fastMs).toBeLessThan(slowMs);
    });
  });

  describe('All racers validation', () => {
    it('should have all racers with valid structure', () => {
      racers.forEach((racer, index) => {
        expect(racer).toHaveProperty('name');
        expect(racer).toHaveProperty('colorTag');
        expect(racer).toHaveProperty('timeStamp');
        
        // Validate types
        expect(typeof racer.name).toBe('string');
        expect(typeof racer.colorTag).toBe('string');
        expect(typeof racer.timeStamp).toBe('string');
        
        // Validate formats
        expect(racer.name.length).toBeGreaterThan(0);
        expect(racer.colorTag).toMatch(/^#([0-9A-F]{3}){1,2}$/i);
        expect(racer.timeStamp).toMatch(/^\d{1,2}:\d{2}\.\d{3}$/);
      });
    });

    it('should have racers sorted by time', () => {
      const times = racers.map((r) => toMillisecond(r.timeStamp));
      
      for (let i = 0; i < times.length - 1; i++) {
        expect(times[i]).toBeLessThanOrEqual(times[i + 1]);
      }
    });
  });

  describe('Color validation', () => {
    it('should accept various hex color formats', () => {
      const testColors = [
        '#fff',
        '#ffffff',
        '#ffa500',
        '#2244ff',
        '#006f62',
      ];
      
      testColors.forEach((color) => {
        expect(color).toMatch(/^#([0-9A-F]{3}){1,2}$/i);
      });
    });

    it('all existing racers should have valid colors', () => {
      racers.forEach((racer) => {
        expect(racer.colorTag).toMatch(/^#([0-9A-F]{3}){1,2}$/i);
      });
    });
  });
});
