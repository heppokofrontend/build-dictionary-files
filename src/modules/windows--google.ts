import fs from 'fs';
import {format} from '../utils/format';

/**
 * Windows10 GoogleIME向け辞書データの書き出し
 * @type {DFB.WriteFunction}
 * @param data - 辞書データ
 * @param dist - 保存するパス
 */
export default (data: DFB.IME_Dictionary[], dist: string) => {
  /**
   * String.prototype.replaceの第２引数
   * @param ｓ - ひらがな１文字
   * @returns - カタカナ１文字
   */
  const replacer = (s: string) => String.fromCharCode(s.charCodeAt(0) + 0x60);
  const TSV = data.map(item => {
    // GoogleIME用に読み仮名をカタカナに変換する
    item.input = item.input?.replace(/[ぁ-ん]/g, replacer);

    const list: DFB.Format = format(item, 'win');

    return list.join('\t');
  }).join('\r\n');

  fs.writeFileSync(dist, TSV);

  return TSV;
};
