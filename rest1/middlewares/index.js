const fs = require('fs');

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${req.ip} ${req.method} ${req.path}`,
      (err) => {
        if (err) console.log("Log error:", err);
        next();
      }
    );
  };
}

module.exports = {
  logReqRes
}
