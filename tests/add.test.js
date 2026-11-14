const MT = typeof require !== "undefined" ? require("./mini-test.js") : window.MT;
const { TodoList } = typeof require !== "undefined" ? require("../js/todolist.js") : window;
const { test, assertEqual, assertThrows } = MT;

test("add returns a task with title and completed=false", () => {
  const todo = new TodoList();
  const task = todo.add("Write report");
  assertEqual(task.title, "Write report");
  assertEqual(task.completed, false);
});

test("added task appears in the list", () => {
  const todo = new TodoList();
  todo.add("Write report");
  assertEqual(todo.all().map(t => t.title), ["Write report"]);
});

test("add rejects an empty title", () => {
  assertThrows(() => new TodoList().add("   "));
});
