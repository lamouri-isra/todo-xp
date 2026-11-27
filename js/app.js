// UI layer: connects the DOM to the TodoList logic (js/todolist.js)
(function () {
  const todo = new TodoList();
  let keyword = "";
  let sortByPriority = false;

  const $ = (id) => document.getElementById(id);
  const list = $("list"), message = $("message"), counter = $("counter");

  function showError(text) { message.textContent = text || ""; }

  function visibleTasks() {
    let tasks = sortByPriority ? todo.byPriority() : todo.all();
    if (keyword) {
      const found = new Set(todo.search(keyword).map((t) => t.id));
      tasks = tasks.filter((t) => found.has(t.id));
    }
    return tasks;
  }

  function render() {
    list.innerHTML = "";
    const tasks = visibleTasks();
    if (tasks.length === 0) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = keyword ? "No task matches your search." : "No tasks yet. Add your first one!";
      list.appendChild(li);
    }
    for (const t of tasks) list.appendChild(renderItem(t));
    const all = todo.all();
    counter.textContent = `${all.filter((t) => t.completed).length} / ${all.length} completed`;
  }

  function renderItem(t) {
    const li = document.createElement("li");
    li.className = "item" + (t.completed ? " done" : "");

    const box = document.createElement("input");
    box.type = "checkbox"; box.checked = t.completed;
    box.setAttribute("aria-label", "Mark as completed");
    box.addEventListener("change", () => { todo.complete(t.id); render(); });

    const title = document.createElement("span");
    title.className = "title"; title.textContent = t.title;

    const badge = document.createElement("span");
    badge.className = "badge " + t.priority; badge.textContent = t.priority;
    badge.title = "Click to change priority"; badge.style.cursor = "pointer";
    badge.addEventListener("click", () => {
      const order = ["High", "Medium", "Low"];
      todo.setPriority(t.id, order[(order.indexOf(t.priority) + 1) % 3]);
      render();
    });

    const edit = document.createElement("button");
    edit.className = "secondary"; edit.textContent = "Edit";
    edit.addEventListener("click", () => {
      const value = prompt("Modify task:", t.title);
      if (value === null) return;
      try { todo.modify(t.id, value); showError(""); } catch (e) { showError(e.message); }
      render();
    });

    const del = document.createElement("button");
    del.className = "danger"; del.textContent = "Delete";
    del.addEventListener("click", () => { todo.delete(t.id); render(); });

    li.append(box, title, badge, edit, del);
    return li;
  }

  $("add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      todo.add($("title").value, $("priority").value);
      $("title").value = ""; showError("");
    } catch (err) { showError(err.message); }
    render();
  });

  $("search").addEventListener("input", (e) => { keyword = e.target.value; render(); });

  $("sort").addEventListener("click", (e) => {
    sortByPriority = !sortByPriority;
    e.target.textContent = sortByPriority ? "Original order" : "Sort by priority";
    render();
  });

  $("clear").addEventListener("click", () => { todo.clearCompleted(); render(); });

  render();
})();
