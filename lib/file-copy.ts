const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const getImports = require('./support/imports.ts');

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

    console.log('> Resolving files');
    sourceFiles = config.files
        .map(getGlob)
        .reduce(reduce)
        .unique()
        .map(resolve);

    console.log('> Resolving imports');
    imports = getImports(config, sourceFiles);

    console.log('> Copying required files');
    imports.local.map(copyFile);

    process.chdir(rootDir);

    return getEntryRelatives(sourceFiles, imports.local);
}

function getEntryRelatives(sourceFiles, importConfigurations) {
    return importConfigurations
        .filter(isSourceFile.bind(sourceFiles))
        .map(configuration => configuration.relative);
}

function isSourceFile(importConfiguration) {
    return this.indexOf(importConfiguration.source) !== -1;
}

module.exports = fileCopy;