export const format = (item: DFB.IME_Dictionary, platform: 'win' | 'mac'): DFB.Format => [
  item.input || 'かな文字',
  item.output || '単語',
  item.type || (platform === 'win' ? '名詞' : '普通名詞'),
];
