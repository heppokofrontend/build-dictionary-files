"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const format = (item, platform) => [
    item.input || 'かな文字',
    item.output || '単語',
    item.type || (platform === 'win' ? '名詞' : '普通名詞'),
];
exports.format = format;
