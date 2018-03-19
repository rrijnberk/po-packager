const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const getImports = require(path.resolve('./', 'lib/support/imports.ts'));

/**
 * Enables the reduction of duplicates to unique values.
 * @returns an array of unique elements
 */
Array.prototype.unique = function unique() {
    return [ ...new Set(this) ]
};

function resolve(filePath) {
    return path.resolve('./', filePath);
}

/**
 * Convert glob pattern to files
 * @param globPattern The glob pattern
 */
function getGlob(globPattern) {
    return glob.sync(globPattern);
}

function print(response) {
    console.log('>', response);
    return response;
}

function reduce(a, b) {
    return a.concat(b);
}

function copyFile(config) {
    fs.copySync(config.source, config.destination);
}

function fileCopy(config) {
    const filesDir = path.resolve('./', config.root),
        rootDir =  path.resolve('./');
    let sourceFiles, imports;

    process.chdir(filesDir);

    sourceFiles = config.files
        .map(getGlob)
        .reduce(reduce)
        .unique()
        .map(resolve)
        .map(print);

    imports = getImports(config, sourceFiles);
    imports.local.map(copyFile);

    process.chdir(rootDir);
}

module.exports = fileCopy;