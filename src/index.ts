#!/usr/bin/env node
import macos from './modules/macos';
import windows from './modules/windows';
import windowsGoogle from './modules/windows--google';

module.exports = (src: DFB.IME_Dictionary[], type: string, dist?: string) => {
  switch (type) {
    case 'win':
      return windows(src, dist);

    case 'winGoogle':
      return windowsGoogle(src, dist);

    case 'mac':
      return macos(src, dist);
  }

  return '';
}
