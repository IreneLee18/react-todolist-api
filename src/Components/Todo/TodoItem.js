function TodoItem({ currentTodoItem, done, clean }) {
  return (
    <>
      {currentTodoItem.map((item) => (
        <li key={item.id}>
          <label htmlFor={item.id}>
            <input
              type="checkbox"
              id={item.id}
              checked={item.completed_at ? true : false}
              onChange={done}
            />
            <div className={item.completed_at ? "check" : ""}></div>
            <p className={item.completed_at ? "done" : ""}>{item.content}</p>
          </label>
          <button value={item.content} id={item.id} onClick={clean}>
            ✕
          </button>
        </li>
      ))}
    </>
  );
}
export default TodoItem;
