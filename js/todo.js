const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function visibleTodos() {
  if (filter === "open") {
    return todos.filter((todo) => !todo.done);
  }
  if (filter === "done") {
    return todos.filter((todo) => todo.done);
  }
  return todos;
}

function render() {
  list.innerHTML = "";
  visibleTodos().forEach((todo) => {
    const item = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      saveTodos();
      render();
    });

    const label = document.createElement("span");
    label.textContent = todo.text;
    if (todo.done) {
      label.style.textDecoration = "line-through";
    }

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveTodos();
      render();
    });

    item.append(checkbox, label, remove);
    list.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    return;
  }
  todos.push({
    id: Date.now(),
    text: text,
    done: false,
  });
  input.value = "";
  saveTodos();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    filterButtons.forEach((other) => {
      other.setAttribute("aria-pressed", String(other === button));
    });
    render();
  });
});

render();
