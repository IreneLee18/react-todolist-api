function AddContent({ newTodo, setNewTodo, addTodo }) {
  return (
    <div className="addContent">
      <input
        type="text"
        placeholder="請新增代辦事項"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value.trim())}
        onKeyPress={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />
      <button onClick={addTodo}></button>
    </div>
  );
}
export default AddContent;