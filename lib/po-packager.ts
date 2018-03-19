const path = require('path');
const config = require(path.resolve('./config/config.json'));
const fileCopy = require(path.resolve('./lib/file-copy.ts'));
const defintion = require(path.resolve('./lib/project-definition.ts'));

fileCopy(config);

defintion.createPackage(config);