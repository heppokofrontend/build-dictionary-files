declare namespace DFB {
  export type IME_Dictionary = {
    input: string,
    output: string,
    type?: string,
  };

  export type Format = [string, string, string];
  export type WriteFunction = (a: DFB.IME_Dictionary[] , b: string) => string;
}
