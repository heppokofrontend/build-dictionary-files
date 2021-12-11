/// <reference types="node" />
/**
 * ファイルの中身を作成します
 * @param src - 辞書データオブジェクト
 * @param type - 書き出すファイルのフォーマット
 * @returns - 辞書データとして書き出すテキスト
 */
export declare const make: (src: DFM.IME_Dictionary[], type: DFM.IME_Type) => string | Buffer;
