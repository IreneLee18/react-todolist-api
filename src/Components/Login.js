import "../style/_loginAndRegister.scss";
import LoginSide from "./Login/LoginSide.js";
import LoginForm from "./Login/LoginForm.js";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="loginBody">
      <div className="container">
        <LoginSide />
        <main className="loginMain">
          <h1>最實用的線上代辦事項服務</h1>
          <LoginForm />
          <div className="go-register">
            <Link to="/register">註冊帳號</Link>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Login;
