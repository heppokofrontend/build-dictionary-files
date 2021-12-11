/** Dictionary-file-maker */
declare namespace DFM {
  /** サポートしているプラットフォームの種類 */
  export type Platform = 'win' | 'mac';
  /** サポートしているIMEの種類 */
  export type IME_Type = 'win' | 'win-google' | 'mac';
  /** ファイルに書き込む直前の状態。よみ、単語、品詞の順。 */
  export type Format = [string, string, string];
  /** ファイルに実際に書き込まれる値 */
  export type Dict = string | Buffer;

  /**
   * 品詞
   * @description
   * その他は省略。基本「名詞」と「人名」のみを利用。Macは書き出し時に調整。
   * 基本はWindowsベースで記述すること。
   */
  export namespace PartsOfSpeech {
    /** @see　https://blogs.windows.com/japan/2017/02/17/imejptips4/ */
    export type win = '名詞' | '短縮よみ' | '人名' | '地名' | '顔文字';
    /** @see https://support.apple.com/ja-jp/guide/japanese-input-method/jpim10211/6.3/mac/11.0 */
    export type mac = '普通名詞' | 'サ変名詞' | '人名' | '地名' | '形容詞' | '副詞' | '接尾語' | '動詞';
    export type anyone = win | mac;
  }

  /** 辞書オブジェクト */
  export type IME_Dictionary<T = PartsOfSpeech.anyone> = {
    /** よみ：変換前の文字列 */
    input: string,
    /** 単語：変換後の文字列 */
    output: string,
    /** 品詞 */
    type?: T,
  };
}
