const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const ts = require("typescript");

const processRoot = process.cwd();


const options = {
    allowJs: false
};

const config = {
    rootDir: 'test/case__1/e2e/page-objects',
    destination: 'dist-po'
}

process.chdir(config.rootDir);


const compile = (fileNames) => {
    const program = ts.createProgram(fileNames, options);
    program
        .getSourceFiles()
        .map(getFileName)
        .map(resolve)
        .filter(isNotANodeModule)
        .map(prepareForCopy)
        .map(copyFile);
};

const copyFile = (filePath) => {
    fs.copySync(filePath.source, filePath.destination);
};

const getFileName = (sourceFile) => {
    return sourceFile.fileName;
};

const isNotANodeModule = (filePath) => {
    const modulesPath = path.join(processRoot, 'node_modules');
    return filePath.substring(0, modulesPath.length) !== modulesPath;
};

const prepareForCopy = (filePath) => {
    const relative = filePath.replace(path.join(processRoot, config.rootDir), '');
    return {
        destination: path.join(processRoot, config.destination, relative),
        source: filePath,
        relative
    };
};

const resolve = (fileName) => {
    return path.resolve(fileName)
};


glob("components/**/*.ts", (err, files) => {
    compile(files);
});

