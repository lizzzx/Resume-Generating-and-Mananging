// Node.js program to demonstrate the
// fs.symlink() method

// Import the filesystem module
const { symlink } = require("fs");

symlink("../../server/EncryptionHandler.js",
  "./EncryptionHandler.js", "file", () => {}
  );