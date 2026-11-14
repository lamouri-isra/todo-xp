// Tiny test framework (works in Node and in the browser)
(function (root) {
  const cases = [];
  function test(name, fn) { cases.push({ name, fn }); }
  function assertEqual(actual, expected) {
    const a = JSON.stringify(actual), e = JSON.stringify(expected);
    if (a !== e) throw new Error(`Expected ${e} but got ${a}`);
  }
  function assertThrows(fn) {
    try { fn(); } catch (e) { return; }
    throw new Error("Expected an error to be thrown");
  }
  function run(report) {
    let passed = 0, failed = 0;
    for (const c of cases) {
      try { c.fn(); passed++; report(true, c.name); }
      catch (e) { failed++; report(false, c.name, e.message); }
    }
    return { passed, failed };
  }
  const api = { test, assertEqual, assertThrows, run };
  if (typeof module !== "undefined") module.exports = api; else root.MT = api;
})(typeof window !== "undefined" ? window : globalThis);
