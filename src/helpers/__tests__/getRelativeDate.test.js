import getRelativeDate from '../getRelativeDate';

describe('getRelativeDate', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should return undefined if called with no params', () => {
    expect(getRelativeDate()).toBeUndefined();
  });
  it('should return year(s) if relative date is bigger than a year', () => {
    expect(getRelativeDate('2019-05-06', '2020-05-07')).toBe('last year');
    expect(getRelativeDate('2018-05-07', '2020-05-07')).toBe('2 years ago');
  });
  it('should return month(s) if relative date is bigger than a month and less than a year', () => {
    expect(getRelativeDate('2020-04-06', '2020-05-07')).toBe('last month');
    expect(getRelativeDate('2020-02-01', '2020-03-02')).toBe('last month');
    expect(getRelativeDate('2019-06-07', '2020-05-07')).toBe('11 months ago');
    expect(getRelativeDate('2019-06-08', '2020-05-07')).toBe('11 months ago');
  });
  it('should return day(s) if relative date is bigger than a hour and less than a month', () => {
    expect(getRelativeDate('2020-05-06', '2020-05-07')).toBe('yesterday');
    expect(getRelativeDate('2020-05-05', '2020-05-07')).toBe('2 days ago');
    expect(getRelativeDate('2020-02-01', '2020-03-01')).toBe('29 days ago');
  });
  it('should return day(s) if relative date is bigger than a minute and less than a day', () => {
    expect(getRelativeDate('2020-05-07T11:00', '2020-05-07T12:00')).toBe('1 hour ago');
    expect(getRelativeDate('2020-05-07T11:00', '2020-05-07T12:30')).toBe('1 hour ago');
    expect(getRelativeDate('2020-05-07T00:00', '2020-05-07T23:59')).toBe('23 hours ago');
  });
  it('should return day(s) if relative date is bigger than a second and less than a hour', () => {
    expect(getRelativeDate('2020-05-07T11:00', '2020-05-07T11:30')).toBe('30 minutes ago');
    expect(getRelativeDate('2020-05-07T11:00', '2020-05-07T11:05')).toBe('5 minutes ago');
    expect(getRelativeDate('2020-05-07T11:00', '2020-05-07T11:01')).toBe('1 minute ago');
  });
  it('should return day(s) if relative date is less than a minute', () => {
    expect(getRelativeDate('2020-05-07T11:00:00', '2020-05-07T11:00:59')).toBe('59 seconds ago');
    expect(getRelativeDate('2020-05-07T11:00:00', '2020-05-07T11:00:01')).toBe('1 second ago');
  });
  it('should return something', () => {
    expect(getRelativeDate('2020-05-07T11:00:00', '2020-05-07T11:00:00')).toBe('now');
    expect(getRelativeDate('2020-05-07', '2020-05-07')).toBe('now');
  });
});
