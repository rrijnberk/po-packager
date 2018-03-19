const path = require('path');
const typescript = require('typescript');

const isLocal = isLocalOrLib.bind(null, false);
const isLib = isLocalOrLib.bind(null, true);

function isLocalOrLib(premise, config) {
    const libPath = path.resolve('./node_modules');
    return (config.source.indexOf(libPath) === 0) === premise;
}

function createConfig(filePath) {
    const root = path.resolve('./', this.root);
    return {
        source: filePath,
        destination: path.resolve('./', this.destination, path.relative(root, filePath))
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