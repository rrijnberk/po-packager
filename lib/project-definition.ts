const fs = require('fs-extra');
const path = require('path');
const package_json = require(path.resolve(('./package.json')));

const newLine = '\n';

function asExport(relativePath) {
    return `export * from './${relativePath}';`;
}

function createDefinitions(config, files) {
    const filePath = path.resolve('./', config.destination, getPackageName(config).concat('.ts'));
    const content = files
        .map(asExport)
        .join(newLine)
        .concat(newLine);

    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, content);
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
        EOL: newLine
    });
}

function getPackageName(config) {
    return package_json.name.concat(config.postfix);
}

module.exports = {
    createDefinitions,
    createPackage
};
