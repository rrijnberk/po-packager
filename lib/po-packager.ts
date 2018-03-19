const path = require('path');
const config = require(path.resolve('./config/config.json'));
const fileCopy = require(path.resolve('./lib/file-copy.ts'));
const rimraf = require('rimraf');
const definition = require(path.resolve('./lib/project-definition.ts'));

const destinationPath = path.resolve('./', config.destination);

rimraf(destinationPath, () => {
    let entries = fileCopy(config);
    definition.createPackage(config);
    definition.createDefinitions(config, entries);
});
