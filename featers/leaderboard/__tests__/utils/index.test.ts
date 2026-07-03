import { diffFromLeader, toMillisecond, toTimeStampForm } from '../../utils';

describe('utils barrel exports', () => {
  it('re-exports diffFromLeader', () => {
    expect(diffFromLeader('1:33.643', '1:33.892')).toBe('0:00.249');
  });

  it('re-exports toMillisecond', () => {
    expect(toMillisecond('1:33.643')).toBe(93643);
  });

  it('re-exports toTimeStampForm', () => {
    expect(toTimeStampForm('133643')).toBe('1:33.643');
  });
});
