import "../style/_todolist.scss";
import { useState, useEffect } from "react";
import Header from "./Todo/Header";
import AddContent from "./Todo/AddContent";
import Tab from "./Todo/Tab";
import TodoItem from "./Todo/TodoItem";
import Empty from "../image/empty.png";
function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const tab = [
    {
      id: "all",
      type: "全部",
    },
    {
      id: "undone",
      type: "待完成",
    },
    {
      id: "done",
      type: "已完成",
    },
  ];
  const [currentTab, setCurrentTab] = useState("all");
  const [todoItem, setTodoItem] = useState([]);
  const [currentTodoItem, setCurrentTodoItem] = useState(todoItem);
  const undone = todoItem.filter((item) => !item.isDone);
  const undoneLeg = undone.length;

  // function
  const addTodo = () => {
    if (newTodo !== "") {
      setTodoItem((state) => [
        ...state,
        {
          id: Math.random(),
          todo: newTodo,
          isDone: false,
        },
      ]);
      setCurrentTodoItem(todoItem);
      setCurrentTab("all");
      setNewTodo("");
    }
  };
  const done = (e) => {
    // 要取得的事checked的值，才能將checked值放到done上（原因：checked是負責切換checkbox的）
    const { id, checked } = e.target;
    return setTodoItem(
      todoItem.map((item) =>
        item.id === Number(id) ? { ...item, isDone: checked } : item
      )
    );
  };
  const clean = (e) => {
    setTodoItem(todoItem.filter((item) => item.id !== Number(e.target.id)));
  };
  const cleanAll = () => {
    setTodoItem(todoItem.filter((item) => !item.isDone));
    setCurrentTab("all");
  };

  // 1.監聽currentTab，當切換tab就執行 2.監聽todoItem，當切換check就執行
  useEffect(() => {
    switch (currentTab) {
      case "all":
        setCurrentTodoItem(todoItem);
        break;
      case "undone":
        setCurrentTodoItem(todoItem.filter((item) => !item.isDone));
        break;
      case "done":
        setCurrentTodoItem(todoItem.filter((item) => item.isDone));
        break;
      default:
        break;
    }
  }, [currentTab, todoItem]);

  // when currentTodoItem.length===0 and todoItme !==0 ,switch stillHave to 'true' and  show stillHaveTxt.
  const [stillHave, setStillHave] = useState(false);
  const [stillHaveTxt, setStillHaveTxt] = useState("");
  useEffect(() => {
    if (currentTodoItem.length === 0) {
      setStillHave(true);
      if (currentTab === "done") {
        setStillHaveTxt("目前還有尚未完成項目");
      } else if (currentTab === "undone") {
        setStillHaveTxt("目前沒有尚未完成項目");
      }
    } else {
      setStillHave(false);
      setStillHaveTxt("");
    }
  }, [currentTodoItem, currentTab]);

  return (
    <>
      <Header />
      <main>
        <AddContent
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
        />
        {todoItem.length > 0 ? (
          <div className="content">
            <ul className="tab">
              <Tab
                tab={tab}
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
              />
            </ul>
            <ul className="todolist">
              {stillHave ? (
                <li className="stillHave">
                  <p>{stillHaveTxt}</p>
                </li>
              ) : (
                <TodoItem
                  currentTodoItem={currentTodoItem}
                  done={done}
                  clean={clean}
                />
              )}
            </ul>
            <div className="bottom">
              <span>{undoneLeg} 個待完成項目</span>
              <button onClick={cleanAll}>清除已完成項目</button>
            </div>
          </div>
        ) : (
          <div className="empty">
            <h2>目前無待辦事項</h2>
            <img src={Empty} alt="empty" />
          </div>
        )}
      </main>
    </>
  );
}

export default TodoList;
