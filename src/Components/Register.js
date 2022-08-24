import "../style/_loginAndRegister.scss";
import RegisterSide from "./Home/HomeSide.js";
import RegisterForm from "./Home/Register/RegisterForm";
import { Link } from "react-router-dom";
function Register() {
  
  return (
    <div className="registerBody">
      <div className="container">
        <RegisterSide/>
        <main className="registerMain">
          <h1>最實用的線上代辦事項服務</h1>
          <RegisterForm/>
          <div className="go-register">
            <Link to="/">登入</Link>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Register;
