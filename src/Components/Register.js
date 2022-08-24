import "../style/_loginAndRegister.scss";
import logo_lg from "../image/logo_lg.png";
import done from "../image/done.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputForm from "./Form/InputForm";
function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const onSubmit = ({ email, nickname, password }) => {
    const apiUrl = "https://todoo.5xcamp.us/users";
    const method = "POST";
    const headers = { "Content-type": "application/json; charset=UTF-8" };
    const body = JSON.stringify({
      user: {
        email,
        nickname,
        password,
      },
    });
    // console.log(body)
    fetch(apiUrl, {
      method,
      headers,
      body,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const inputData = [
    {
      title: "Email",
      type: "text",
      id: "email",
      placeholder: "請輸入Email",
      validation: {
        required: { value: true, message: "此欄位不可為空" },
        pattern: {
          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          message: "請輸入正確Email格式",
        },
      },
      errors: errors.email?.message,
    },
    {
      title: "您的暱稱",
      type: "text",
      id: "nickname",
      placeholder: "請輸入您的暱稱",
      validation: {
        required: { value: true, message: "此欄位不可為空" },
      },
      errors: errors.nickname?.message,
    },
    {
      title: "密碼",
      type: "password",
      id: "password",
      placeholder: "請輸入密碼",
      validation: {
        required: { value: true, message: "此欄位不可為空" },
        minLength: { value: 8, message: "密碼長度至少8個唷！" },
      },
      errors: errors.password?.message,
    },
    {
      title: "再次輸入密碼",
      type: "password",
      id: "passwordAgain",
      placeholder: "請再次輸入密碼",
      validation: {
        required: { value: true, message: "此欄位不可為空" },
        validate: (value) =>
          value === watch("password", "") || "兩次密碼輸入不同，請重新確認",
      },
      errors: errors.passwordAgain?.message,
    },
  ];
  return (
    <div className="registerBody">
      <div className="container">
        <div className="side">
          <div>
            <img src={logo_lg} alt="logo" />
          </div>
          <div>
            <img src={done} alt="done" />
          </div>
        </div>
        <main className="registerMain">
          <h1>最實用的線上代辦事項服務</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {inputData.map((item) => (
              <InputForm item={item} register={register} key={item.id} />
            ))}
            <label htmlFor="register-btn">
              <input
                type="submit"
                id="register-btn"
                className="btn"
                value=" "
              />
              <span>註冊帳號</span>
            </label>
          </form>
          <div className="go-register">
            <Link to="/">登入</Link>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Register;
