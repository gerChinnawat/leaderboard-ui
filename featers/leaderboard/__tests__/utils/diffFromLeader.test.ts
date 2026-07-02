import { diffFromLeader } from '../../utils/diffFromLeader';

describe('diffFromLeader', () => {
  it('should return the gap in minutes and seconds behind the leader', () => {
    expect(diffFromLeader('1:33.643', '1:33.892')).toBe('0:00.249');
  });

  it('should zero-pad seconds below ten', () => {
    expect(diffFromLeader('1:33.643', '1:34.252')).toBe('0:00.609');
  });

  it('should return zero when the racer is the leader', () => {
    expect(diffFromLeader('1:33.643', '1:33.643')).toBe('0:00.000');
  });

  it('should roll over into whole minutes when the gap exceeds sixty seconds', () => {
    expect(diffFromLeader('1:00.000', '2:05.500')).toBe('1:05.500');
  });

  it('should calculate the gap for Lando Norris behind Oscar Piastri', () => {
    expect(diffFromLeader('1:33.643', '1:34.251')).toBe('0:00.608');
  });

  it('should calculate the gap for Alexander Albon behind Oscar Piastri', () => {
    expect(diffFromLeader('1:33.643', '1:34.604')).toBe('0:00.961');
  });
});
