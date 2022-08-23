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
      requireErr: "此欄位不可為空",
      requiredName: "pattern",
      requiredValue: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      requireMsg: "請輸入正確Email格式",
      errors:errors.email?.message
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
      errors:errors.password?.message
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <label htmlFor="email">
        <span>Email</span>
        <input
          type="text"
          id="email"
          placeholder="請輸入Email"
          {...register("email", {
            required: "此欄位不得為空",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "請輸入正確Email格式",
            },
          })}
        />
        <span>{errors.email?.message}</span>
      </label>
      <label htmlFor="password">
        <span>密碼</span>
        <input
          type="password"
          id="password"
          placeholder="請輸入密碼"
          {...register("password", {
            required: "此欄位不得為空",
            minLength: {
              value: 8,
              message: "密碼長度至少8個唷！",
            },
          })}
        />
        <span>{errors.password?.message}</span>
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
                value: `${item.requiredValue}`,
                message: `${item.requireMsg}`,
              },
            })}
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