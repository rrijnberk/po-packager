const path = require('path');
const rimraf = require('rimraf');

const fileCopy = require('./file-copy.ts');
const definition = require('./project-definition.ts');
const compiler = require('./tsc-compiler.ts');

let config = require('./../config/config.json');

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
        let entries = fileCopy(config),
            typingsFile;

        console.log('Creating package file');
        definition.createPackage(config);

        console.log('Creating typescript definitions');
        typingsFile = definition.createDefinitions(config, entries);

        console.log('Compiling typescript');
        compiler.compile(typingsFile);
    });
}

module.exports = {
    createPackage
};