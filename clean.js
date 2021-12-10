const fs = require('fs/promises');

(async () => {
  await fs.rm('./lib', {
    recursive: true,
  });
})();
