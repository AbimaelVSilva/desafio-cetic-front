export default function TextField(
  {
    text,
    type = "text",
    name,
    required = true,
    minLength = "",
    maxLength,
    defaultValue = "",
    disabled = false,
    value,
    placeholder = "",
    onChange = () => {},
    pattern = null,
    max = null,
    autoComplete = null,
  },
  minim = ""
) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {text}
      </label>
      <div className="mt-2">
        <input
          min={minim}
          max={max}
          pattern={pattern}
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          {...(Boolean(value) ? { value: value } : {})}
          {...(Boolean(defaultValue) ? { defaultValue: defaultValue } : {})}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
