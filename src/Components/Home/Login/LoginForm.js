import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Utils/Context";
import { getAPI_login } from "../../../Utils/ApiFetch";
import InputForm from "../InputForm";
import { sweetAlert } from "../../../Utils/SweetAlert";

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setToken, setUserName } = useAuth();
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
  ];
  const onSubmit = (data) => {
    const userData = JSON.stringify({ user: data });
    getAPI_login(userData)
      .then((res) => {
        // console.log(res.headers.get('authorization'))
        setToken(res.headers.get("authorization"));
        return res.json();
      })
      .then((res) => {
        if (res.message === "登入失敗") {
          sweetAlert(`error`, `不好意思，${res.message}！`, `請在嘗試一次！`);
        } else {
          sweetAlert(
            `success`,
            `恭喜您${res.message}！`,
            `Hi！${res.nickname}，即將幫您跳轉到ToDoList～`
          );
          setUserName(res.nickname);
          window.setTimeout(() => {
            navigate("/todolist");
          }, 3000);
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputData.map((item) => (
        <InputForm item={item} register={register} key={item.id} />
      ))}
      <label htmlFor="login-btn">
        <input type="submit" id="login-btn" className="btn" value=" " />
        <span>登入</span>
      </label>
    </form>
  );
}
export default LoginForm;
