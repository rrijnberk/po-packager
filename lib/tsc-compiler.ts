const path = require('path');
const typescript = require('typescript');

function compile(entryFilePath) {
    console.log('compiling:', entryFilePath)

    const program = typescript.createProgram([entryFilePath], {
        target: typescript.ScriptTarget.ES5
    });
    program.emit();
}

module.exports = {
    compile
};