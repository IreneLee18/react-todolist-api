import "../Style/_todolist.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/Context";
import { getAPI_todo, addAPI_todo, deleteAPI_todo, toggleAPI_todo } from "../Utils/ApiFetch";
import Header from "../Components/Todo/Header";
import AddContent from "../Components/Todo/AddContent";
import Tab from "../Components/Todo/Tab";
import TodoItem from "../Components/Todo/TodoItem";
import Empty from "../Image/empty.png";
import { sweetAlert } from "../Utils/SweetAlert";

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [todoItem, setTodoItem] = useState([]);
  const [currentTodoItem, setCurrentTodoItem] = useState(todoItem);
  const undone = todoItem.filter((item) => item.completed_at === null);
  const undoneLeg = undone.length;

  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    getTodo();
  }, []);

  // function
  const getTodo = () => {
    getAPI_todo(token)
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "未授權") {
          sweetAlert(
            `error`,
            `不好意思，${res.message}！`,
            `即將幫你幫你跳轉到登入畫面！`
          );
          window.setTimeout(() => {
            navigate("/");
          }, 3000);
        }
        setTodoItem(res.todos);
      });
  };
  const addTodo = () => {
    if (newTodo !== "") {
      const todo = JSON.stringify({
        todo: {
          content: newTodo,
        },
      });
      addAPI_todo(token, todo)
        .then((res) => res.json())
        .then((res) => {
          sweetAlert(`success`, `恭喜新增成功！`, `新增「${res.content}」`);
          setCurrentTodoItem(todoItem);
          setCurrentTab("all");
          setNewTodo("");
          getTodo();
        });
    } else {
      sweetAlert(`error`, `新增失敗`, `請再嘗試一次！`);
    }
  };
  const done = (e) => {
    const { id } = e.target;
    toggleAPI_todo(id, token)
      .then((res) => res.json())
      .then((res) => {
        if (res.completed_at) {
          sweetAlert(`success`, `恭喜完成`, `恭喜您完成「${res.content}」囉！`);
        } else {
          sweetAlert(
            `success`,
            `加油～～`,
            `再加把勁點完成「${res.content}」！`
          );
        }
        setTodoItem(
          todoItem.map((item) =>
            item.id === id ? { ...item, completed_at: res.completed_at } : item
          )
        );
      });
  };
  const clean = (e) => {
    const { id, value } = e.target;
    setTodoItem(todoItem.filter((item) => item.id !== e.target.id));
    deleteAPI_todo(id, token)
      .then((res) => res.json())
      .then((res) => {
        sweetAlert(`success`, `確認刪除`, `${res.message}代辦事項：${value}`);
      });
  };
  const delaySec = ms => new Promise(resolve => setTimeout(resolve, ms))
  const cleanAll = async () => {
    todoItem.filter((item) => {
      if (item.completed_at !== null) {
        deleteAPI_todo(item.id, token)
          .then((res) => res.json())
          .then((res) => {
            sweetAlert(`success`, `確認刪除`, `刪除所有已完成項目！`);
          });
      }
      setCurrentTab("all");
    });
    await delaySec(1000)
    getTodo();
  };

  // 1.監聽currentTab，當切換tab就執行 2.監聽todoItem，當切換check就執行
  useEffect(() => {
    switch (currentTab) {
      case "all":
        setCurrentTodoItem(todoItem);
        break;
      case "undone":
        setCurrentTodoItem(
          todoItem.filter((item) => item.completed_at === null)
        );
        break;
      case "done":
        setCurrentTodoItem(
          todoItem.filter((item) => item.completed_at !== null)
        );
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
              <Tab setCurrentTab={setCurrentTab} currentTab={currentTab} />
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
              <span>{ undoneLeg>0 ? `${undoneLeg} 個待完成項目` : `無待完成項目` }</span>
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
