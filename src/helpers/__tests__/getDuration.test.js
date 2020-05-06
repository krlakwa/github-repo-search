import getDuration from '../getDuration';

describe('getDuration', () => {
  it('should return falsy value if called with missing params', () => {
    expect(getDuration()).toBeFalsy();
    expect(getDuration(1234)).toBeFalsy();
  });
  it('should return falsy value if any param is not a number', () => {
    const num = 1000;
    const str = '2000';

    expect(getDuration(num, str)).toBeFalsy();
    expect(getDuration(str, num)).toBeFalsy();
  });
  it('should return calculated value if called with correct params', () => {
    expect(getDuration(1000, 2000)).toBe('1sec');
  });
  it('should return string if called with correct values', () => {
    expect(typeof getDuration(1000, 2000)).toBe('string');
  });
});
