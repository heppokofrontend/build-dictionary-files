#!/usr/bin/env node
import path from 'path';
import fs from 'fs/promises';
import {format} from './utils/format';

/** TSV or CSV */
const sep = {
  win: '\t',
  mac: ',',
}

/**
 * 書き出し
 * @param data - 実際に書き出すデータ
 * @param fp - 書き出し先のファイルパス
 */
const write = async (data: DFM.Dict, fp: string) => {
  const {root} = path.parse(fp);
  const target = root === '' ? path.join(process.cwd(), fp) : fp;

  await fs.mkdir(path.parse(target).dir, {
    recursive: true,
  });

  await fs.writeFile(target, data);
};

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

/**
 * dictionary-file-maker
 * @param src - 辞書データオブジェクト
 * @param type - 書き出すファイルのフォーマット
 * @param dist - 書き出し先のファイルパス
 * @returns　実際に書き出すテキストデータ
 */
export const dictMaker = async (
  src: DFM.IME_Dictionary[],
  type: DFM.IME_Type,
  dist?: string
) => {
  const {dir, base, ext} = path.parse(dist || process.cwd());
  const filename = ext === '.txt' ? base : path.join(base, `./dict--${type}.txt`);
  const filePath = path.join(dir, filename);
  const data = make(src, type);

  await write(data, filePath);

  return data;
}
