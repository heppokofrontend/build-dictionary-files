import {format} from './format';

describe('Format', () => {
  describe('Windows', () => {
    test('No type', () => {
      const mock: DFM.IME_Dictionary<DFM.PartsOfSpeech.win> = {
        input: 'ほげ',
        output: 'HOGEHOGE',
      };
      const [a, b, c] = format(mock, 'win');

      expect(a).toBe('ほげ');
      expect(b).toBe('HOGEHOGE');
      expect(c).toBe('名詞');
    });

    test('The type prop exsists', () => {
      const mock: DFM.IME_Dictionary<DFM.PartsOfSpeech.win> = {
        input: 'ほげ',
        output: 'HOGEHOGE',
        type: '人名',
      };
      const [a, b, c] = format(mock, 'win');

      expect(a).toBe('ほげ');
      expect(b).toBe('HOGEHOGE');
      expect(c).toBe('人名');
    });
  });

  describe('macOS', () => {
    test('macOS', () => {
      const mock: DFM.IME_Dictionary<DFM.PartsOfSpeech.mac> = {
        input: 'ほげ',
        output: 'HOGEHOGE',
      };
      const [a, b, c] = format(mock, 'mac');

      expect(a).toBe('ほげ');
      expect(b).toBe('HOGEHOGE');
      expect(c).toBe('普通名詞');
    });

    test('The type prop exsists', () => {
      const mock: DFM.IME_Dictionary<DFM.PartsOfSpeech.mac> = {
        input: 'ほげ',
        output: 'HOGEHOGE',
        type: '人名',
      };
      const [a, b, c] = format(mock, 'win');

      expect(a).toBe('ほげ');
      expect(b).toBe('HOGEHOGE');
      expect(c).toBe('人名');
    });
  });
});
