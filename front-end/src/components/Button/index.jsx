function Button({ text }) {
  return (
    <button className="bg-blue-800 text-white px-4 w-full py-2 rounded-lg transition duration-300 transform hover:bg-blue-700 hover:scale-105 cursor-pointer">
      {text}
    </button>
  );
}

export default Button;
