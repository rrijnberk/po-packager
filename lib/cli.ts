#! /usr/bin/env node

const program = require('commander');
const packager = require('./po-packager.ts');

const defaults = {
    config: 'po-packager.json'
};

let params;

Array.prototype.getParameter = function(premise) {
    return this.indexOf(premise) !== -1 ? this[this.indexOf(premise) + 1] : null;
};

function getParameter(option) {
    const value = program.rawArgs.getParameter(option.long) || program.rawArgs.getParameter(option.short);
    let result = {};
    if(value) result[option.long.replace('--', '')] = value;
    return result;
}

function join(a, b) {
    return Object.assign(a, b);
}

program
    .option('-c, --config', 'Set configuration file (defaults to po-packager.json)')
    .parse(process.argv);


params = program
    .options
    .map(getParameter)
    .reduce(join);

params = Object.assign(defaults, params);

packager.createPackage(params);
