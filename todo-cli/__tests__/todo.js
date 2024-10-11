const todoList = require("../todo"); 

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split("T")[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0];

    todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
    todos.add({ title: "Pay rent", dueDate: today, completed: true });
    todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
    todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
    todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
  });

  test("Should create a new todo", () => {
    todos.add({ title: "New Todo", dueDate: new Date().toISOString().split("T")[0], completed: false });
    expect(todos.all.length).toBe(6);
  });

  test("Should mark a todo as completed", () => {
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueTodos = todos.overdue();
    expect(overdueTodos.length).toBe(1);
    expect(overdueTodos[0].title).toBe("Submit assignment");
  });

  test("Should retrieve due today items", () => {
    const dueTodayTodos = todos.dueToday();
    expect(dueTodayTodos.length).toBe(2);
    expect(dueTodayTodos[0].title).toBe("Pay rent");
  });

  test("Should retrieve due later items", () => {
    const dueLaterTodos = todos.dueLater();
    expect(dueLaterTodos.length).toBe(2);
    expect(dueLaterTodos[0].title).toBe("File taxes");
  });

  test("Should display todos in correct format", () => {
    const dueTodayTodos = todos.dueToday();
    const formatted = todos.toDisplayableList(dueTodayTodos);
    expect(formatted).toBe("[x] Pay rent\n[ ] Service Vehicle");
  });
});
