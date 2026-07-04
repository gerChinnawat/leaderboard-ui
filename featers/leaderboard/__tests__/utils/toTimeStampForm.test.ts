import { toTimeStampForm } from '../../utils/toTimeStampForm';

describe('toTimeStampForm', () => {
  it('should format 6-character timestamp string correctly', () => {
    const result = toTimeStampForm('133643');
    expect(result).toBe('1:33.643');
  });

  it('should format timestamp with leading zeros', () => {
    expect(toTimeStampForm('015530')).toBe('0:15.530');
  });

  it('should format timestamp for Oscar Piastri', () => {
    expect(toTimeStampForm('133643')).toBe('1:33.643');
  });

  it('should format timestamp for George Russell', () => {
    expect(toTimeStampForm('133892')).toBe('1:33.892');
  });

  it('should format timestamp for Lando Norris', () => {
    expect(toTimeStampForm('134251')).toBe('1:34.251');
  });

  it('should format timestamp for Max Verstappen', () => {
    expect(toTimeStampForm('134252')).toBe('1:34.252');
  });

  it('should handle high values', () => {
    expect(toTimeStampForm('595999')).toBe('5:95.999');
  });

  it('should handle zero values', () => {
    expect(toTimeStampForm('000000')).toBe('0:00.000');
  });

  it('should format single digit minute values', () => {
    expect(toTimeStampForm('012345')).toBe('0:12.345');
  });

  it('should preserve all digits in correct positions', () => {
    const input = '234567';
    const result = toTimeStampForm(input);

    // First character is minute part
    expect(result[0]).toBe('2');
    // Colon separator
    expect(result[1]).toBe(':');
    // Second and third chars are seconds
    expect(result.substring(2, 4)).toBe('34');
    // Dot separator
    expect(result[4]).toBe('.');
    // Last three characters are milliseconds
    expect(result.substring(5)).toBe('567');
  });
});
