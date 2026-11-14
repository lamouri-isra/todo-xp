(function () {
const MT = typeof require !== "undefined" ? require("./mini-test.js") : window.MT;
const { TodoList } = typeof require !== "undefined" ? require("../js/todolist.js") : window;
const { test, assertEqual, assertThrows } = MT;

test("modify changes the title", () => {
  const todo = new TodoList();
  const t = todo.add("Old");
  todo.modify(t.id, "New");
  assertEqual(todo.all()[0].title, "New");
});

test("modify rejects an empty title", () => {
  const todo = new TodoList();
  const t = todo.add("Old");
  assertThrows(() => todo.modify(t.id, ""));
});

test("modify on unknown id throws", () => {
  assertThrows(() => new TodoList().modify(1, "x"));
});
})();
