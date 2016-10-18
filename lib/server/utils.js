'use strict';

const fs = require('fs-extra');
const path = require('path');
const q = require('q');
const url = require('url');

const outputFile = q.denodeify(fs.outputFile);
const projectDirectory = 'src';

function exists (file) {
  var filePath = path.join(process.cwd(), projectDirectory, file);
  return q.nfcall(fs.access, filePath, fs.R_OK | fs.W_OK)
    .then(() => filePath)
    .catch((err) => q.reject());
}

function requestPath (req) {
  let path = url.parse(req.url).pathname;
  return exists(path);
}

function sendLocal (req, res, next) {
  if (req.url === '/') {
    req.url = '/index.html';
  }
  console.log(new Date(), req.method, req.url);
  requestPath(req)
    .then(
      (f) => {
        let stream = fs.createReadStream(f);
        res.type(path.extname(f));
        stream.pipe(res);
      },
      next
    )
    .catch((e) => console.warn(e));
}

module.exports = {
  sendLocal: sendLocal
};
