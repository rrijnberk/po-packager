const path = require('path');
const typescript = require('typescript');

const isLocal = isLocalOrLib.bind(null, false);
const isLib = isLocalOrLib.bind(null, true);

const libPath = path.resolve('./node_modules');

function isLocalOrLib(premise, config) {
    return (config.source.indexOf(libPath) === 0) === premise;
}

function createConfig(filePath) {
    const root = path.resolve('./', this.root),
        relative = path.relative(root, filePath);
    return {
        source: filePath,
        destination: path.resolve('./', this.destination, relative),
        relative
    }
}

function getFileName(sourceFile) {
    return sourceFile.fileName;
}

function getImports(config, files) {
    const program = typescript.createProgram(files, {});
    const configurations = program
        .getSourceFiles()
        .map(getFileName)
        .map(createConfig.bind(config));

    return {
        local: configurations.filter(isLocal),
        libs: configurations.filter(isLib)
    }
}

module.exports = getImports;