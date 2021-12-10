import fs from 'fs';

/**
 * macOS向け辞書データの書き出し
 * @param data - 辞書データ
 * @param dist - 保存するパス
 */
export default (data: DFB.IME_Dictionary[], dist: string = './dict--macos.txt') => {
  const CSV = data.map(item => {
    const list: DFB.Format = [
      item.input,
      item.output,
      item.type || '普通名詞',
    ];

    return list.join(',');
  }).join('\n');

  fs.writeFileSync(dist, CSV);

  return CSV;
};
