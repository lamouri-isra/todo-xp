(function () {
const MT = typeof require !== "undefined" ? require("./mini-test.js") : window.MT;
const { TodoList } = typeof require !== "undefined" ? require("../js/todolist.js") : window;
const { test, assertEqual, assertThrows } = MT;

function sample() {
  const todo = new TodoList();
  todo.add("Write report"); todo.add("Buy milk"); todo.add("Report bug");
  return todo;
}

test("search is case-insensitive", () => {
  assertEqual(sample().search("REPORT").map(t => t.title), ["Write report", "Report bug"]);
});

test("search with no match returns an empty array", () => {
  assertEqual(sample().search("xyz"), []);
});
})();
