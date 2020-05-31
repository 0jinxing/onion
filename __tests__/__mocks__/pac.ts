const path = require("path");
const fs = require("fs");

const pacTemplate = fs
  .readFileSync(path.resolve("__tests__/__mocks__/assets/pac-template.txt"))
  .toString();
  
module.exports = pacTemplate;
