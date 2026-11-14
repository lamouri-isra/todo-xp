const MT = typeof require !== "undefined" ? require("./mini-test.js") : window.MT;
const { TodoList } = typeof require !== "undefined" ? require("../js/todolist.js") : window;
const { test, assertEqual, assertThrows } = MT;

test("default priority is Medium", () => {
  assertEqual(new TodoList().add("A").priority, "Medium");
});

test("add with a priority", () => {
  assertEqual(new TodoList().add("A", "High").priority, "High");
});

test("invalid priority is rejected", () => {
  assertThrows(() => new TodoList().add("A", "Urgent"));
});

test("set priority on an existing task", () => {
  const todo = new TodoList();
  const t = todo.add("A");
  todo.setPriority(t.id, "Low");
  assertEqual(todo.all()[0].priority, "Low");
});

test("byPriority sorts High, Medium, Low", () => {
  const todo = new TodoList();
  todo.add("low", "Low"); todo.add("high", "High"); todo.add("med");
  assertEqual(todo.byPriority().map(t => t.title), ["high", "med", "low"]);
});
