(function (root) {
  const PRIORITIES = ["High", "Medium", "Low"];

  class TodoList {
    constructor() {
      this._tasks = [];
      this._nextId = 1;
    }

    static _cleanTitle(title) {
      if (!title || !title.trim()) throw new Error("Title must not be empty");
      return title.trim();
    }

    static _checkPriority(priority) {
      if (!PRIORITIES.includes(priority)) throw new Error("Priority must be High, Medium or Low");
      return priority;
    }

    add(title, priority = "Medium") {
      const task = {
        id: this._nextId++,
        title: TodoList._cleanTitle(title),
        completed: false,
        priority: TodoList._checkPriority(priority),
      };
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

    search(keyword) {
      const k = keyword.trim().toLowerCase();
      return this._tasks.filter(t => t.title.toLowerCase().includes(k));
    }

    setPriority(id, priority) {
      const task = this._get(id);
      task.priority = TodoList._checkPriority(priority);
      return task;
    }

    byPriority() {
      return [...this._tasks].sort((a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority));
    }

    clearCompleted() {
      const before = this._tasks.length;
      this._tasks = this._tasks.filter(t => !t.completed);
      return before - this._tasks.length;
    }

    all() {
      return [...this._tasks];
    }
  }

  if (typeof module !== "undefined") module.exports = { TodoList };
  else root.TodoList = TodoList;
})(typeof window !== "undefined" ? window : globalThis);
