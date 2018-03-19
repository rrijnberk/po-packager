const fs = require('fs-extra');
const path = require('path');
const package_json = require(path.resolve(('./package.json')));

function getPackageName(config) {
    return package_json.name.concat(config.postfix);
}

function createDefinitions(config) {
}

function createPackage(config) {
    const filePath = path.resolve('./', config.destination, 'package.json'),
        packageContent = {
            name: getPackageName(config),
            version: package_json.version,
            license: package_json.license
        };


    fs.ensureFileSync(filePath);
    fs.writeJsonSync(filePath, packageContent, {
        spaces: 2,
        EOL: '\n'
    });
}

module.exports = {
    createDefinitions,
    createPackage
};