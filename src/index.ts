#!/usr/bin/env node
import fs from 'fs/promises';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import macos from './modules/macos';
import windows from './modules/windows';
import windowsGoogle from './modules/windows--google';

module.exports = async (dist: string, src?: DFB.IME_Dictionary[]) => {
  const argv = await yargs(hideBin(process.argv)).argv;
  const data = src || (
    JSON.parse(
      typeof argv._[0] === 'string' && await fs.readFile(argv._[0], {
        encoding: 'utf-8',
      }) || '[]'
    )
  );

  if (!Array.isArray(data)) {
    throw new Error("JSON format is invalid.");
  }

  switch (true) {
    case argv.win:
      windows(data, dist);
      break;

    case argv.winGoogle:
      windowsGoogle(data, dist);
      break;

    case argv.mac:
      macos(data, dist);
      break;
  }

  return data;
}
