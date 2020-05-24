// eslint-disable-next-line @typescript-eslint/no-var-requires
const jetpack = require('fs-jetpack');
jetpack.copy('../client/dist/client', 'dist/client', { overwrite: true });
