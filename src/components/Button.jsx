export default function Button({
  text,
  type = "button",
  disabled = false,
  onClick = () => {},
}) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {typeof text !== "undefined" ? <p>{text}</p> : null}
      </button>
    </div>
  );
}
