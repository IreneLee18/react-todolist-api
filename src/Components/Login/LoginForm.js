import { useForm } from "react-hook-form";
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      errors:errors.email?.message
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
      errors:errors.password?.message
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
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
      <label htmlFor="login-btn">
        <input type="submit" id="login-btn" className="btn" value=" " />
        <span>登入</span>
      </label>
    </form>
  );
}
export default LoginForm;
