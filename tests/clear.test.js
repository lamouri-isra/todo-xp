(function () {
const MT = typeof require !== "undefined" ? require("./mini-test.js") : window.MT;
const { TodoList } = typeof require !== "undefined" ? require("../js/todolist.js") : window;
const { test, assertEqual } = MT;

test("clearCompleted removes only completed tasks", () => {
  const todo = new TodoList();
  const a = todo.add("A"); todo.add("B");
  todo.complete(a.id);
  todo.clearCompleted();
  assertEqual(todo.all().map(t => t.title), ["B"]);
});

test("clearCompleted returns the number of removed tasks", () => {
  const todo = new TodoList();
  const a = todo.add("A"); const b = todo.add("B"); todo.add("C");
  todo.complete(a.id); todo.complete(b.id);
  assertEqual(todo.clearCompleted(), 2);
});
})();
