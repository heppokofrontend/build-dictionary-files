import {make} from './make';
import mock from '../../sample/mock.json';

describe('Make', () => {
  test('macOS', () => {
    const result = make(mock, 'mac')

    expect(result).toBe('ほげほげ,Hello World,普通名詞\nやまだ,山田,人名');
  });

  test('Windows', () => {
    const result = (make(mock, 'win') as Buffer).toString('utf16le');

    expect(result).toBe('\ufeffほげほげ\tHello World\t名詞\nやまだ\t山田\t人名');
  });

  test('Windows Google', () => {
    const result = make(mock, 'win-google');

    expect(result).toBe('ホゲホゲ\tHello World\t名詞\r\nヤマダ\t山田\t人名');
  });
});
