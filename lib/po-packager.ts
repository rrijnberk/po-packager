const path = require('path');
const fileCopy = require(path.resolve('./lib/file-copy.ts'));
const rimraf = require('rimraf');
const definition = require(path.resolve('./lib/project-definition.ts'));

let config = require(path.resolve('./config/config.json'));

function createPackage(params) {
    if(params.config) {
        const externalConfig = require(path.resolve('./', params.config));
        config = Object.assign(config, externalConfig);
    }

    config.root = path.resolve('./', config.root);
    config.destination = path.resolve('./', config.destination);

    console.log(`Removing configured destination '${config.destination}' (if applicable).`);
    rimraf(config.destination, () => {
        console.log('Starting copy');
        let entries = fileCopy(config);

        console.log('Creating package file');
        definition.createPackage(config);

        console.log('Creating typescript definitions');
        definition.createDefinitions(config, entries);
    });
}

module.exports = {
    createPackage
};