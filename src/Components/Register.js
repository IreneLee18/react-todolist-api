import "../style/_loginAndRegister.scss";
import logo_lg from "../image/logo_lg.png";
import done from "../image/done.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useState } from "react";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // setUser(data);
    console.log(data)
  };
  // const [user, setUser] = useState({});
  const inputData = [
    {
      title: "Email",
      type: "text",
      id: "email",
      placeholder: "請輸入Email",
      requireErr: "此欄位不可為空",
      requiredName: "pattern",
      requiredValue: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      requireMsg: "請輸入正確Email格式",
      errors: errors.email?.message,
    },
    {
      title: "您的暱稱",
      type: "text",
      id: "userName",
      placeholder: "請輸入您的暱稱",
      requireErr: "此欄位不可為空",
      errors: errors.userName?.message,
    },
    {
      title: "密碼",
      type: "password",
      id: "password",
      placeholder: "請輸入密碼",
      requireErr: "此欄位不可為空",
      requiredName: "minLength",
      requiredValue: 8,
      requireMsg: "密碼長度至少8個唷！",
      errors: errors.password?.message,
    },
    {
      title: "再次輸入密碼",
      type: "password",
      id: "passwordAgain",
      placeholder: "請再次輸入密碼",
      requireErr: "此欄位不可為空",
      requiredName: "minLength",
      requiredValue: 8,
      requireMsg: "請輸入正確密碼",
      errors: errors.passwordAgain?.message,
    },
  ];
  // function onHandelChange(e) {
  //   const { id, value } = e.target;
  //   setUser((state)=>({...state,[id]:value}))
  // }
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
            {/* <label htmlFor="email">
              <span>Email</span>
              <input type="text" id="email" placeholder="請輸入Email" />
              <span>此欄位不可為空</span>
            </label>
            <label htmlFor="userName">
              <span>您的暱稱</span>
              <input type="text" id="userName" placeholder="請輸入您的暱稱" />
              <span>此欄位不可為空</span>
            </label>
            <label htmlFor="password">
              <span>密碼</span>
              <input type="password" id="password" placeholder="請輸入密碼" />
              <span>此欄位不可為空</span>
            </label>
            <label htmlFor="passwordAgain">
              <span>再次輸入密碼</span>
              <input type="password" id="passwordAgain" placeholder="請再次輸入密碼" />
              <span>此欄位不可為空</span>
            </label> */}
            {inputData.map((item) => (
              <label htmlFor={item.id} key={item.id}>
                <span>{item.title}</span>
                <input
                  type={item.type}
                  id={item.id}
                  placeholder={item.placeholder}
                  {...register(`${item.id}`, {
                    required: `${item.requireErr}`,
                    [item.requiredName]: {
                      value: item.requiredValue,
                      message: item.requireMsg,
                    },
                  })}
                />
                <span>{item.errors}</span>
              </label>
            ))}
            <label htmlFor="register-btn">
              <input type="submit" id="register-btn" className="btn" value=" " />
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
