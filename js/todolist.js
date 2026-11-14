(function (root) {
  class TodoList {
    constructor() {
      this._tasks = [];
      this._nextId = 1;
    }

    static _cleanTitle(title) {
      if (!title || !title.trim()) throw new Error("Title must not be empty");
      return title.trim();
    }

    add(title) {
      const task = { id: this._nextId++, title: TodoList._cleanTitle(title), completed: false };
      this._tasks.push(task);
      return task;
    }

    all() {
      return [...this._tasks];
    }
  }

  if (typeof module !== "undefined") module.exports = { TodoList };
  else root.TodoList = TodoList;
})(typeof window !== "undefined" ? window : globalThis);
