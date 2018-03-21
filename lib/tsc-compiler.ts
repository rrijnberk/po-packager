const ts = require('typescript');

function compile(entryFilePath) {
    const options = {
        module: ts.ModuleKind.UMD,
        target: ts.ScriptTarget.ES2015,
        sourceMap: true,
        declaration: true
    };

    console.log(options);

    const program = ts.createProgram([entryFilePath], options);
    program.emit();
}

module.exports = {
    compile
};