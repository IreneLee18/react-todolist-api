import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Utils/Context";
import { getAPI_register } from "../../../Utils/ApiFetch";
import InputForm from "../InputForm";
import { sweetAlert } from "../../../Utils/SweetAlert";

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const onSubmit = ({ email, nickname, password }) => {
    const userData = JSON.stringify({
      user: {
        email,
        nickname,
        password,
      },
    });
    getAPI_register(userData)
      .then((res) => {
        // console.log(res.headers.get('authorization'))
        setToken(res.headers.get("authorization"));
        return res.json();
      })
      .then((res) => {
        if (res.hasOwnProperty("error")) {
          sweetAlert(
            `error`,
            `不好意思，${res.message}！`,
            `${res.error[0]}！請在嘗試一次！`
          );
        } else {
          sweetAlert(
            `success`,
            `恭喜您${res.message}！`,
            `Hi！${res.nickname}，即將幫您跳轉到登入畫面～`
          );
          window.setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      });
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
        minLength: { value: 6, message: "密碼長度至少6個唷！" },
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
        <InputForm
          item={item}
          register={register}
          key={item.id}
          // errorsInput={errorsInput}
        />
      ))}
      <label htmlFor="register-btn">
        <input type="submit" id="register-btn" className="btn" value=" " />
        <span>註冊帳號</span>
      </label>
    </form>
  );
}
export default RegisterForm;
