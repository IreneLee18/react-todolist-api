import logo_lg from "../../Image/logo_lg.png";
import done from "../../Image/done.png";
function LoginSide() {
  return (
    <div className="side">
      <div>
        <img src={logo_lg} alt="logo" />
      </div>
      <div>
        <img src={done} alt="done" />
      </div>
    </div>
  );
}
export default LoginSide;