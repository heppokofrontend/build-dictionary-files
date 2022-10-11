#!/usr/bin/env node
import path from 'path';
import fs from 'fs/promises';
import { make } from './utils/make';

/**
 * 書き出し
 * @param data - 実際に書き出すデータ
 * @param fp - 書き出し先のファイルパス
 */
const write = async (data: DFM.Dict, fp: string) => {
  const { root } = path.parse(fp);
  const target = root === '' ? path.join(process.cwd(), fp) : fp;

  await fs.mkdir(path.parse(target).dir, {
    recursive: true,
  });

  await fs.writeFile(target, data);
};

/**
 * dictionary-file-maker
 * @param src - 辞書データオブジェクト
 * @param type - 書き出すファイルのフォーマット
 * @param dist - 書き出し先のファイルパス
 * @returns　実際に書き出すテキストデータ
 */
const dictMaker = async (src: DFM.IME_Dictionary[], type: DFM.IME_Type, dist?: string) => {
  const { dir, base, ext } = path.parse(dist || process.cwd());
  const filename = ext === '.txt' ? base : path.join(base, `./dict--${type}.txt`);
  const filePath = path.join(dir, filename);
  const data = make(src, type);

  await write(data, filePath);

  return data;
};

export { dictMaker, make };
