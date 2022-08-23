import { Link } from "react-router-dom";
import logoImage from "../../image/logo.png";
function Header() {
  return (
    <header>
      <img src={logoImage} alt="logo" />
      <ul>
        <li>
          <p className="myName">我的代辦</p>
        </li>
        <li><Link to="/">登出</Link></li>
      </ul>
    </header>
  );
}
export default Header;
