#!/usr/bin/env node
import path from 'path';
import fs from 'fs/promises';
import macos from './modules/macos';
import windows from './modules/windows';
import windowsGoogle from './modules/windows--google';

const write = async (cb: DFB.WriteFunction, src: DFB.IME_Dictionary[], fp: string): Promise<string> => {
  const {root} = path.parse(fp);
  const target = root === '' ? path.join(process.cwd(), fp) : fp;

  await fs.mkdir(path.parse(target).dir, {
    recursive: true,
  });

  return cb(src, target);
};

module.exports = (src: DFB.IME_Dictionary[], type: string, dist?: string) => {
  const {dir, base, ext} = path.parse(dist || process.cwd());

  switch (type) {
    case 'win': {
      const filename = ext === '.txt' ? base : path.join(base, './dict--win.txt');
      const filePath = path.join(dir, filename);

      return write(windows,, src, filePath);
    }

    case 'winGoogle': {
      const filename = ext === '.txt' ? base : path.join(base, './dict--win-google.txt');
      const filePath = path.join(dir, filename);

      return write(windowsGoogle,, src, filePath);
    }

    case 'mac': {
      const filename = ext === '.txt' ? base : path.join(base, './dict--macos.txt');
      const filePath = path.join(dir, filename);

      return write(macos,, src, filePath);
    }
  }

  return new Promise<string>(r => r(''));
}
