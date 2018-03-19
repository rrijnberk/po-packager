const path = require('path');
const config = require(path.resolve('./config/config.json'));
const fileCopy = require(path.resolve('./lib/file-copy.ts'));
const rimraf = require('rimraf');
const definition = require(path.resolve('./lib/project-definition.ts'));

const destinationPath = path.resolve('./', config.destination);

console.log(`Removing configured destination '${config.destination}' (if applicable).`);
rimraf(destinationPath, () => {
    console.log('Starting copy');
    let entries = fileCopy(config);

    console.log('Creating package file');
    definition.createPackage(config);

    console.log('Creating typescript definitions');
    definition.createDefinitions(config, entries);
});
