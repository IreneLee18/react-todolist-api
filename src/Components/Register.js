import "../style/_loginAndRegister.scss";
import logo_lg from "../image/logo_lg.png";
import done from "../image/done.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    // 因為所有的data會取得到passwordAgain，但因為回傳到API上不需要passwordAgain
    // 所以用 Object.entries 將物件轉成陣列，並刪除passwordAgain，之後再使用map將值賦予到userData(負責存放真正要傳到api上的資料)上，就可以取得到所需要的完整資料。
    const userData = {};
    Object.entries(data)
      .splice(0, 3)
      .map((item) => (userData[item[0]] = item[1]));
    // console.log(userData);
    const apiUrl = "https://todoo.5xcamp.us/users";
    const method = "POST";
    // const headers = { "Content-type": "application/json; charset=UTF-8" };
    const body = JSON.stringify({
      user: {
        ...userData,
      },
    });
    fetch(apiUrl, {
      method,
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
              <label htmlFor={item.id} key={item.id}>
                <span>{item.title}</span>
                <input
                  type={item.type}
                  id={item.id}
                  placeholder={item.placeholder}
                  {...register(`${item.id}`, { ...item.validation })}
                />
                <span>{item.errors}</span>
              </label>
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
