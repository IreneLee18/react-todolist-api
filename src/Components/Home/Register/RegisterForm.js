import { useForm } from "react-hook-form";
import InputForm from "../InputForm";
function RegisterForm() {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputData.map((item) => (
        <InputForm item={item} register={register} key={item.id}/>
      ))}
      <label htmlFor="login-btn">
        <input type="submit" id="login-btn" className="btn" value=" " />
        <span>登入</span>
      </label>
    </form>
  );
}
export default RegisterForm;
