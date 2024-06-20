import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

function App() {
  const [todos, setTodos] = useState(() => {
    let localTodos = localStorage.getItem("ITEMS");
    if (localTodos == null) return [];

    return JSON.parse(localTodos);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, isCompleted: false },
      ];
    });
  }

  function toggleTodo(id, isCompleted) {
    setTodos((currentTodos) => {
      return currentTodos.map((x) => {
        if (x.id === id) {
          return { ...x, isCompleted };
        }

        return x;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((x) => x.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1>Todos</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

export default App;
