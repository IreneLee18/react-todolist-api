function TodoItem({ currentTodoItem, done, clean }) {
  return (
    <>
      {currentTodoItem.map((item) => (
        <li key={item.id}>
          <label htmlFor={item.id}>
            <input
              type="checkbox"
              id={item.id}
              checked={item.isDone}
              onChange={done}
            />
            <div className={item.isDone ? "check" : ""}></div>
            <p className={item.isDone ? "done" : ""}>{item.todo}</p>
          </label>
          <button id={item.id} onClick={clean}>
            ✕
          </button>
        </li>
      ))}
    </>
  );
}
export default TodoItem;