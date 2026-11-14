const MT = typeof require !== "undefined" ? require("./mini-test.js") : window.MT;
const { TodoList } = typeof require !== "undefined" ? require("../js/todolist.js") : window;
const { test, assertEqual, assertThrows } = MT;

test("complete marks the task as completed", () => {
  const todo = new TodoList();
  const t = todo.add("Write report");
  todo.complete(t.id);
  assertEqual(todo.all()[0].completed, true);
});

test("complete on unknown id throws", () => {
  assertThrows(() => new TodoList().complete(99));
});
