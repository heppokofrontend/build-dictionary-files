import fs from 'fs';

/**
 * Windows10標準IME向け辞書データの書き出し
 * @type {DFB.WriteFunction}
 * @param data - 辞書データ
 * @param dist - 保存するパス
 */
export default (data: DFB.IME_Dictionary[], dist: string) => {
  const TSV = data.map(item => {
    const list: DFB.Format = [
      item.input,
      item.output,
      item.type || '名詞',
    ];

    return list.join('\t');
  }).join('\n');

  fs.writeFileSync(
    dist,
    Buffer.from(`\ufeff${TSV}`, 'utf16le'),
  );

  return TSV;
};
