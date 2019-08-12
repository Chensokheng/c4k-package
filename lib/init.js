
"use strict";
const fs = require("fs");
const path = require("path");
const {
    promisify
} = require("util");
const directory = __dirname.replace("/lib", "")

const cmd = require("node-cmd");

exports.createFiles = async function (code) {
    if (code) {
        const commit_template = readFile(".commit_template");
        const gitignore = readFile(".gitignorefile");
        const dependencis = readFile("dependencis.json");

        writeFile(commit_template, ".commit_template");
        writeFile(gitignore, ".gitignore");
        writeFile(dependencis, "package.json");

        await promisify(cmd.get)("npm install");
        await promisify(cmd.get)("git init");

        fs.writeFileSync("index.js");
    } else {
        return " enter something";
    }
}


function readFile(filename) {
    return fs.readFileSync(`${__dirname}/${filename}`).toString();
}


async function writeFile(content, filename) {
    const dir = process.cwd();
    fs.writeFile(path.join(dir, filename), content, (err, data) => {
        if (err) {
            console.log(err);
        }
    });
}