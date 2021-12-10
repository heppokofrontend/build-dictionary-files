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
 * @param dict - 実際に書き出すテキストデータ
 * @param fp - 書き出し先のファイルパス
 */
const write = async (dict: string, fp: string) => {
  const {root} = path.parse(fp);
  const target = root === '' ? path.join(process.cwd(), fp) : fp;

  await fs.mkdir(path.parse(target).dir, {
    recursive: true,
  });

  await fs.writeFile(
    target,
    Buffer.from(`\ufeff${dict}`, 'utf16le'),
  );
};

/**
 * String.prototype.replaceの第２引数
 * @param ｓ - ひらがな１文字
 * @returns - カタカナ１文字
 */
const replacer = (s: string) => String.fromCharCode(s.charCodeAt(0) + 0x60);

/**
 * Build-dictionary-files
 * @param src - 辞書データオブジェクト
 * @param type - 書き出すファイルのフォーマット
 * @param dist - 書き出し先のファイルパス
 * @returns　実際に書き出すテキストデータ
 */
module.exports = async (
  src: DFB.IME_Dictionary[],
  type: 'win' | 'win-google' | 'mac',
  dist?: string
) => {
  const {dir, base, ext} = path.parse(dist || process.cwd());
  const filename = ext === '.txt' ? base : path.join(base, `./dict--${type}.txt`);
  const filePath = path.join(dir, filename);
  const platform = type.startsWith('win') ? 'win' : 'mac';
  const data = src.map(item => {
    // GoogleIME用に読み仮名をカタカナに変換する
    if (type === 'win-google') {
      item.input = item.input?.replace(/[ぁ-ん]/g, replacer);
    }

    const list: DFB.Format = format(item, platform);

    return list.join(sep[platform]);
  }).join(type === 'win-google' ? '\r\n' : '\n');

  await write(data, filePath);

  return data;
}
