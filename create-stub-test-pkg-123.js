const fs = require("fs");

fs.rmSync("node_modules/test-pkg-123", { recursive: true, force: true });
fs.mkdirSync("node_modules/test-pkg-123");
fs.writeFileSync(
  "node_modules/test-pkg-123/package.json",
  JSON.stringify(
    {
      name: "test-pkg-123",
      version: "0.0.0",
      type: "module",
      exports: "./main.js",
    },
    null,
    2,
  ),
);

fs.writeFileSync(
  "node_modules/test-pkg-123/main.js",
  `function something() {console.log("I am something from test-pkg-123")}
   export default something`,
);
