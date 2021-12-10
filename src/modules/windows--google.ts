import fs from 'fs';

/**
 * Windows10 GoogleIME向け辞書データの書き出し
 * @param data - 辞書データ
 * @param dist - 保存するパス
 */
export default (data: DFB.IME_Dictionary[], dist: string = './dict--win-google.txt') => {
  /**
   * String.prototype.replaceの第２引数
   * @param ｓ - ひらがな１文字
   * @returns - カタカナ１文字
   */
  const replacer = (s: string) => String.fromCharCode(s.charCodeAt(0) + 0x60);
  const TSV = data.map(item => {
    const list: DFB.Format = [
      // GoogleIME用に読み仮名をカタカナに変換する
      item.input.replace(/[ぁ-ん]/g, replacer),
      item.output,
      item.type || '名詞',
    ];

    return list.join('\t');
  }).join('\r\n');

  fs.writeFileSync(dist, TSV);
};
