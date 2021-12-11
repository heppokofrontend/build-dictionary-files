#!/usr/bin/env node
/// <reference types="node" />
import { make } from './utils/make';
/**
 * dictionary-file-maker
 * @param src - 辞書データオブジェクト
 * @param type - 書き出すファイルのフォーマット
 * @param dist - 書き出し先のファイルパス
 * @returns　実際に書き出すテキストデータ
 */
declare const dictMaker: (src: DFM.IME_Dictionary[], type: DFM.IME_Type, dist?: string | undefined) => Promise<string | Buffer>;
export { dictMaker, make, };
