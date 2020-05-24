const jetpack = require('fs-jetpack');
jetpack.write(
  'src/environments/environment.prod.ts',
  jetpack
    .read('src/environments/environment.prod.ts')
    .replace(
      /(?:process\.env\.)([^']+)/g,
      (_, variable) => process.env[variable],
    ),
);
