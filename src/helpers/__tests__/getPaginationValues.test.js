import getPaginationValues from '../getPaginationValues';

describe('getPaginationValues', () => {
  it('should return empty array if called with invalid params', () => {
    expect(Array.isArray(getPaginationValues())).toBeTruthy();
    expect(getPaginationValues()).toHaveLength(0);
    expect(getPaginationValues(123)).toHaveLength(0);
    expect(getPaginationValues(undefined)).toHaveLength(0);
    expect(getPaginationValues(['abc'])).toHaveLength(0);
    expect(getPaginationValues({ a: 123, b: 'abc' })).toHaveLength(0);
    expect(getPaginationValues(null)).toHaveLength(0);
    expect(getPaginationValues(NaN)).toHaveLength(0);
  });
  it('should return array with two elements if called with correct param', () => {
    const url = `https://www.saltoks.com`;
    const text = `Salto Rules!`;
    const str = `<${url}>; rel="${text}"`;

    const result = getPaginationValues(str);

    expect(result).toHaveLength(2);
    expect(result[0]).toBe(url);
    expect(result[1]).toBe(text);
  });
});
