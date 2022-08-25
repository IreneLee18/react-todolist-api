import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/Context";
import logoImage from "../../Image/logo.png";
import { sweetAlert } from "../../Utils/SweetAlert";

function Header() {
  const navigate = useNavigate();
  const { userName } = useAuth();
  const logOut = (e) => {
    sweetAlert("success", "登出成功！", "掰掰囉～記得再回來確認ToDoList唷！");
    window.setTimeout(() => {
      navigate("/");
      window.localStorage.clear();
    }, 3000);
  };
  return (
    <header>
      <img src={logoImage} alt="logo" />
      <ul>
        <li>
          <p className="myName">{userName}的代辦</p>
        </li>
        <li>
          <button name="logout" onClick={logOut}>
            登出
          </button>
        </li>
      </ul>
    </header>
  );
}
export default Header;
