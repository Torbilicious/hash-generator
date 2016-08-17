// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


var sha1 = "sha1 no yet calculated";
var sha256Hash = "sha256 no yet calculated";

var hashesMap = new Map();

function generateHashFromFile(file, algorithm = 'sha1') {

    var filename = file;
    var crypto = require('crypto');
    var fs = require('fs');

    var shasum = crypto.createHash(algorithm);

    var s = fs.ReadStream(filename);

    var hash = "";

    s.on('data', function (d) {
        shasum.update(d);
    });

    s.on('end', function () {
        var hash = shasum.digest('hex');

        console.log(hash);

        hashesMap.set(algorithm, hash);

        displayHashes();
    });
}

function generateHashes(file) {

    generateHashFromFile(file, "sha1");
    generateHashFromFile(file, "sha256");
    generateHashFromFile(file, "sha512");
    generateHashFromFile(file, "md5");
}

function displayHashes() {

    const sha1Input = document.getElementById("sha1-input");
    sha1Input.value = hashesMap.get("sha1");

    const sha256Input = document.getElementById("sha256-input");
    sha256Input.value = hashesMap.get("sha256");

    const sha512Input = document.getElementById("sha512-input");
    sha512Input.value = hashesMap.get("sha512");

    const md5Input = document.getElementById("md5-input");
    md5Input.value = hashesMap.get("md5");
}

document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault()
};

document.body.ondrop = (ev) => {
    console.log(ev.dataTransfer.files[0].path + "\n");

    generateHashes(ev.dataTransfer.files[0].path);

    ev.preventDefault()
};