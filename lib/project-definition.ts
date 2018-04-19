const fs = require('fs-extra');
const path = require('path');
const package_json = require(path.resolve('./package.json'));

const newLine = '\n';

function asExport(relativePath) {
    return `export * from './${relativePath.replace('.ts', '')}';`;
}

function createDefinitions(config, files) {
    const filePath = path.resolve('./', config.destination, getPackageName(config).concat('.ts'));
    const content = files
        .map(asExport)
        .join(newLine)
        .concat(newLine);

    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, content);
    return filePath;
}

function createPackage(config) {
    const filePath = path.resolve('./', config.destination, 'package.json'),
        packageName = getPackageName(config),
        packageContent = {
            license: package_json.license,
            main: packageName.concat('.js'),
            name: package_json.name.concat(config.postfix),
            typings: packageName.concat('.ts'),
            version: package_json.version
        };

    fs.ensureFileSync(filePath);
    fs.writeJsonSync(filePath, packageContent, {
        spaces: 2,
        EOL: newLine
    });
}

function getPackageName(config) {
    const nameSegments = package_json.name.split('/'),
        name = nameSegments[nameSegments.length -1];
    return name.concat(config.postfix);
}

module.exports = {
    createDefinitions,
    createPackage
};
