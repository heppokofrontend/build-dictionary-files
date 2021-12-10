import {format} from './format';

describe('Format', () => {
  test('Windows', () => {
    const mock = {
      input: 'ほげ',
      output: 'HOGEHOGE',
    };
    const [a, b, c] = format(mock, 'win');

    expect(a).toBe('ほげ');
    expect(b).toBe('HOGEHOGE');
    expect(c).toBe('名詞');
  });

  test('macOS', () => {
    const mock = {
      input: 'ほげ',
      output: 'HOGEHOGE',
    };
    const [a, b, c] = format(mock, 'mac');

    expect(a).toBe('ほげ');
    expect(b).toBe('HOGEHOGE');
    expect(c).toBe('普通名詞');
  });
});
