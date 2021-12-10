export const format = (item: DFM.IME_Dictionary, platform: 'win' | 'mac'): DFM.Format => [
  item.input || 'かな文字',
  item.output || '単語',
  item.type || (platform === 'win' ? '名詞' : '普通名詞'),
];
