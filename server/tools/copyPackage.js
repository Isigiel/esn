// eslint-disable-next-line @typescript-eslint/no-var-requires
const jetpack = require('fs-jetpack');
const deployCommand = `[config]
CM_SCRIPT_GENERATOR_ARGS=--node
SCM_DO_BUILD_DURING_DEPLOYMENT=true`;
// jetpack.write('dist/package.json', ciPackage);
jetpack.copy('package.json', 'dist/package.json');
jetpack.write('dist/.deployment', deployCommand);
