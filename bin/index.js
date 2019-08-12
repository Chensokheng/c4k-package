#!/usr/bin/env node

const init = require("../lib/init");

const args = process.argv[2];

init.createFiles(args);


