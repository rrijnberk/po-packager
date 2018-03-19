const path = require('path');
const config = require(path.resolve('./config/config.json'));
const fileCopy = require(path.resolve('./lib/file-copy.ts'));

fileCopy(config);