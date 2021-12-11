import {format} from './format';

/** TSV or CSV */
const sep = {
  win: '\t',
  mac: ',',
}

/**
 * String.prototype.replaceの第２引数
 * @param ｓ - ひらがな１文字
 * @returns - カタカナ１文字
 */
const replacer = (s: string) => String.fromCharCode(s.charCodeAt(0) + 0x60);

/**
 * ファイルの中身を作成します
 * @param src - 辞書データオブジェクト
 * @param type - 書き出すファイルのフォーマット
 * @returns - 辞書データとして書き出すテキスト
 */
export const make = (src: DFM.IME_Dictionary[], type: DFM.IME_Type) => {
  const platform = type.startsWith('win') ? 'win' : 'mac';
  const data = src.map(item => {
    // GoogleIME用に読み仮名をカタカナに変換する
    if (type === 'win-google') {
      item.input = item.input?.replace(/[ぁ-ん]/g, replacer);
    }

    const list: DFM.Format = format(item, platform);

    return list.join(sep[platform]);
  });

  switch (type) {
    case 'win-google':
      return data.join('\r\n');

    case 'win':
      return Buffer.from(`\ufeff${data.join('\n')}`, 'utf16le');

    default:
      return data.join('\n');
  }
};
