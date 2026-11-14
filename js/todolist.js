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

    complete(id) {
      for (const task of this._tasks) {
        if (task.id === id) { task.completed = true; return task; }
      }
      throw new Error(`Task ${id} not found`);
    }

    delete(id) {
      for (let i = 0; i < this._tasks.length; i++) {
        if (this._tasks[i].id === id) { this._tasks.splice(i, 1); return; }
      }
      throw new Error(`Task ${id} not found`);
    }

    all() {
      return [...this._tasks];
    }
  }

  if (typeof module !== "undefined") module.exports = { TodoList };
  else root.TodoList = TodoList;
})(typeof window !== "undefined" ? window : globalThis);
