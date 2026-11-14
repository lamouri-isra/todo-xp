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

    _get(id) {
      const task = this._tasks.find(t => t.id === id);
      if (!task) throw new Error(`Task ${id} not found`);
      return task;
    }

    complete(id) {
      const task = this._get(id);
      task.completed = true;
      return task;
    }

    delete(id) {
      this._tasks.splice(this._tasks.indexOf(this._get(id)), 1);
    }

    modify(id, newTitle) {
      const task = this._get(id);
      task.title = TodoList._cleanTitle(newTitle);
      return task;
    }

    all() {
      return [...this._tasks];
    }
  }

  if (typeof module !== "undefined") module.exports = { TodoList };
  else root.TodoList = TodoList;
})(typeof window !== "undefined" ? window : globalThis);
