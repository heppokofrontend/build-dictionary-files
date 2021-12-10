declare namespace DFM {
  export type IME_Type = 'win' | 'win-google' | 'mac';
  export type IME_Dictionary = {
    input: string,
    output: string,
    type?: string,
  };
  export type Format = [string, string, string];
}
