import { toMillisecond } from '../../utils/toMillisecond';

describe('toMillisecond', () => {
  it('should convert a single digit minute and seconds correctly', () => {
    const result = toMillisecond('1:33.643');
    expect(result).toBe(93643);
  });

  it('should convert minutes and seconds to milliseconds', () => {
    expect(toMillisecond('2:15.500')).toBe(135500);
  });

  it('should handle zero minutes', () => {
    expect(toMillisecond('0:30.000')).toBe(30000);
  });

  it('should handle high minute values', () => {
    expect(toMillisecond('59:59.999')).toBe(3599999);
  });

  it('should calculate milliseconds correctly for Oscar Piastri lap time', () => {
    expect(toMillisecond('1:33.643')).toBe(93643);
  });

  it('should calculate milliseconds correctly for George Russell lap time', () => {
    expect(toMillisecond('1:33.892')).toBe(93892);
  });

  it('should calculate milliseconds correctly for Max Verstappen lap time', () => {
    expect(toMillisecond('1:34.252')).toBe(94252);
  });

  it('should properly sort times when converted to milliseconds', () => {
    const time1 = toMillisecond('1:33.643');
    const time2 = toMillisecond('1:33.892');
    const time3 = toMillisecond('1:34.252');

    expect(time1 < time2).toBe(true);
    expect(time2 < time3).toBe(true);
  });

  it('should handle boundary times', () => {
    const zeroTime = toMillisecond('0:00.000');
    const maxTime = toMillisecond('99:59.999');

    expect(zeroTime).toBe(0);
    expect(maxTime).toBe(5999999);
  });
});
