const fs = require('fs/promises');
const { access, constants } = require('fs');

access('./lib', constants.F_OK, async (err) => {
  if (err) {
    return;
  }

  await fs.rm('./lib', {
    recursive: true,
  });
});
