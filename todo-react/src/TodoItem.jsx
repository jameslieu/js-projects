export function TodoItem({ id, title, isCompleted, toggleTodo, deleteTodo }) {
  return (
    <li key={id}>
      <label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  );
}
