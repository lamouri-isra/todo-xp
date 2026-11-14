// Node runner: node tests/run.js
const fs = require("fs"), path = require("path");
const mt = require("./mini-test.js");
const files = fs.readdirSync(__dirname).filter(f => f.endsWith(".test.js")).sort();
for (const f of files) require(path.join(__dirname, f));
const r = mt.run((ok, name, msg) => console.log(ok ? "  PASS" : "  FAIL", name, ok ? "" : "-> " + msg));
console.log(`\n${r.passed} passed, ${r.failed} failed`);
process.exit(r.failed ? 1 : 0);
