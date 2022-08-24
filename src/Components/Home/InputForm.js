function InputForm({ item, register }) {
  const { id, title, type, placeholder, validation, errors } = item;
  return (
    <label htmlFor={id}>
      <span>{title}</span>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(`${id}`, { ...validation })}
      />
      <span>{errors}</span>
    </label>
  );
}
export default InputForm;
