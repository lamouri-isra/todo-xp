(function () {
const MT = typeof require !== "undefined" ? require("./mini-test.js") : window.MT;
const { TodoList } = typeof require !== "undefined" ? require("../js/todolist.js") : window;
const { test, assertEqual, assertThrows } = MT;

test("delete removes the task", () => {
  const todo = new TodoList();
  const t = todo.add("Write report");
  todo.delete(t.id);
  assertEqual(todo.all(), []);
});

test("delete removes only the target", () => {
  const todo = new TodoList();
  const a = todo.add("A"); todo.add("B");
  todo.delete(a.id);
  assertEqual(todo.all().map(t => t.title), ["B"]);
});

test("delete on unknown id throws", () => {
  assertThrows(() => new TodoList().delete(42));
});
})();
