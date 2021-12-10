#!/usr/bin/env node
import path from 'path';
import fs from 'fs/promises';
import macos from './modules/macos';
import windows from './modules/windows';
import windowsGoogle from './modules/windows--google';

module.exports = (src: DFB.IME_Dictionary[], type: string, dist?: string) => {
  const {dir, base, ext} = path.parse(dist || process.cwd());
  const write = async (cb: DFB.WriteFunction, fp: string): Promise<string> => {
    const {root} = path.parse(fp);
    const target = root === '' ? path.join(process.cwd(), fp) : fp;

    await fs.mkdir(path.parse(target).dir, {
      recursive: true,
    });

    return cb(src, target);
  };

  switch (type) {
    case 'win': {
      const filename = ext === '.txt' ? base : path.join(base, './dict--win.txt');
      const filePath = path.join(dir, filename);

      return write(windows, filePath);
    }

    case 'winGoogle': {
      const filename = ext === '.txt' ? base : path.join(base, './dict--win-google.txt');
      const filePath = path.join(dir, filename);

      return write(windowsGoogle, filePath);
    }

    case 'mac': {
      const filename = ext === '.txt' ? base : path.join(base, './dict--macos.txt');
      const filePath = path.join(dir, filename);

      return write(macos, filePath);
    }
  }

  return new Promise<string>(r => r(''));
}
