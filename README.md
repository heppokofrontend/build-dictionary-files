# @heppokofrontend/dictionary-file-maker

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Published on NPM](https://img.shields.io/npm/v/@heppokofrontend/dictionary-file-maker.svg)](https://www.npmjs.com/package/@heppokofrontend/dictionary-file-maker) ![test workflow](https://github.com/heppokofrontend/dictionary-file-maker/actions/workflows/ci.yml/badge.svg)
 [![](https://data.jsdelivr.com/v1/package/npm/@heppokofrontend/dictionary-file-maker/badge)](https://www.jsdelivr.com/package/npm/@heppokofrontend/dictionary-file-maker) [![Maintainability](https://api.codeclimate.com/v1/badges/d9e6294b7c78a8c306fb/maintainability)](https://codeclimate.com/github/heppokofrontend/dictionary-file-maker/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d9e6294b7c78a8c306fb/test_coverage)](https://codeclimate.com/github/heppokofrontend/dictionary-file-maker/test_coverage) [![Known Vulnerabilities](https://snyk.io/test/npm/@heppokofrontend/dictionary-file-maker/badge.svg)](https://snyk.io/test/npm/@heppokofrontend/dictionary-file-maker)
 [![@heppokofrontend/dictionary-file-maker](https://snyk.io/advisor/npm-package/@heppokofrontend/dictionary-file-maker/badge.svg)](https://snyk.io/advisor/npm-package/@heppokofrontend/dictionary-file-maker)


The `dictMaker()` method convert object to IME user dictionary tool config file.

See these instructions on how to use the text files exported by this tool.

- [Windows 10](./WINDOWS.md)
- [macOS](./MACOS.md)

## Usage

Installation:

```shell
npm install --save-dev @heppokofrontend/dictionary-file-maker
```

Example: 

```javascript
import { dictMaker } from '@heppokofrontend/dictionary-file-maker';

const obj = [
  {
    input: 'かな１',
    output: '単語A',
  },
  {
    input: 'かな２',
    output: '単語B',
  },
  {
    input: 'かな３',
    output: '単語C',
  },
];

dictMaker(obj, 'win', './result.txt'); // The text file is writen.
```

## Syntax

```ts
dictMaker(src, type, dist);
```

### Parameters

#### `src` - `{input, output, [type]}[]`

The dictionary data array object, or parsed JSON.

```json
[
  {
    "input": "かな",
    "output": "単語",
    "type": "品詞"
  }
]
```

|property|type|default|required|description|
|---|:-:|:-:|:-:|---|
|`input`|`string`|`""`|`true`|The "yomi" of word in Japanese.|
|`output`|`string`|`""`|`true`|The word of conversion result.|
|`type`|`string`|Will be described later|\-|It's the parts of speech. Default value varies depending on the export target platform.|

The `type` prop is able to use those values.

- for Windows
  - `名詞` (default)
  - `短縮よみ`
  - `人名`
  - `地名`
  - `顔文字`
- for macOS
  - `普通名詞` (default)
  - `サ変名詞`
  - `人名`
  - `地名`
  - `形容詞`
  - `副詞`
  - `接尾語`
  - `動詞`

**FYI:**  
https://blogs.windows.com/japan/2017/02/17/imejptips4/  
https://support.apple.com/ja-jp/guide/japanese-input-method/jpim10211/6.3/mac/11.0

#### `type` - `string`

The target platform name.

- `win` - For Windows IME
- `win-google` - For "Google 日本語入力" on Windows
- `mac` - For macOS IME

#### `dist` - `string`

Dictionary text file export destination.

## CLI

```shell
dict-maker [source] [options]

# sample
dict-maker yourfile.json --mac --win --winGoogle --out ./dictionary
```

```
  -o, --out        Specify an output folder for dictionary files.                      [string]
      --win        Enable the export of dictionary data for Windows 10 standard IME.   [boolean]
      --winGoogle  Enable the export of dictionary data for Google IME on Windows 10.  [boolean]
      --mac        Enable the export of dictionary data for macOS IME                  [boolean]
```


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
