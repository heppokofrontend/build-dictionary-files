#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = exports.dictMaker = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const make_1 = require("./utils/make");
Object.defineProperty(exports, "make", { enumerable: true, get: function () { return make_1.make; } });
/**
 * 書き出し
 * @param data - 実際に書き出すデータ
 * @param fp - 書き出し先のファイルパス
 */
const write = async (data, fp) => {
    const { root } = path_1.default.parse(fp);
    const target = root === '' ? path_1.default.join(process.cwd(), fp) : fp;
    await promises_1.default.mkdir(path_1.default.parse(target).dir, {
        recursive: true,
    });
    await promises_1.default.writeFile(target, data);
};
/**
 * dictionary-file-maker
 * @param src - 辞書データオブジェクト
 * @param type - 書き出すファイルのフォーマット
 * @param dist - 書き出し先のファイルパス
 * @returns　実際に書き出すテキストデータ
 */
const dictMaker = async (src, type, dist) => {
    const { dir, base, ext } = path_1.default.parse(dist || process.cwd());
    const filename = ext === '.txt' ? base : path_1.default.join(base, `./dict--${type}.txt`);
    const filePath = path_1.default.join(dir, filename);
    const data = (0, make_1.make)(src, type);
    await write(data, filePath);
    return data;
};
exports.dictMaker = dictMaker;
