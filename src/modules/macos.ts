import fs from 'fs';

/**
 * macOS向け辞書データの書き出し
 * @type {DFB.WriteFunction}
 * @param data - 辞書データ
 * @param dist - 保存するパス
 */
export default (data: DFB.IME_Dictionary[], dist: string) => {
  const CSV = data.map(item => {
    const list: DFB.Format = [
      item.input || 'かな文字',
      item.output || '単語',
      item.type || '普通名詞',
    ];

    return list.join(',');
  }).join('\n');

  fs.writeFileSync(dist, CSV);

  return CSV;
};
