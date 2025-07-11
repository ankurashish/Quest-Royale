import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState(""); // Holds current input text
  const [todos, setTodos] = useState([]); // Array of all todos
  const [showfinished, setshowfinished] = useState(false); // Toggle for showing completed todos

  // Load todos from localStorage on first mount
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    console.log("Loaded from storage:", todoString);
    if (todoString) {
      try {
        setTodos(JSON.parse(todoString)); // Parse and set stored todos
      } catch (err) {
        console.error("Failed to parse localStorage:", err);
      }
    }
  }, []);

  // 🔁 (Redundant) Same as above — can be removed
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const isFirstRun = useRef(true); // Track if this is the first render

  // Save todos to localStorage, but skip on initial render
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo(""); // Clear input field
  };

  // Handle typing in input
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Remove a todo by ID
  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  // Edit a todo by setting its text to input
  const handleEdit = (id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo); // Put text back in input
    setTodos(todos.filter((item) => item.id !== id)); // Remove original
  };

  // Toggle checkbox (isCompleted)
  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  // Toggle visibility of completed todos
  const toggleShowFinished = () => {
    setshowfinished(!showfinished);
  };
  return (
    <>
      {/* Main wrapper with gradient background */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-400 p-6 min-h-screen">
        {/* App logo */}
        <div className="logo flex items-center justify-center">
          <span className="font-bold text-xl mx-8  text-white  p-6 m-2 rounded-full ">
            Quest Royale
          </span>
        </div>

        {/* Top navigation */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Main container */}
        <div className="container border-1 border-white mx-auto bg-gradient-to-r from-[#2e3192] to-[#1bffff] p-5 my-5 rounded-xl min-h-screen md:min-h-[500px]  w-full md:w-3/4">
          {/* Add todo input and button */}
          <div className="addTodo ">
            <h2 className="text-lg font-bold text-yellow-300">Add a Quest</h2>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="border-1 border-white rounded-full p-1 m-1 text-white w-3/4"
            />
            <button
              onClick={handleAdd}
              disabled={todo.trim() === ""}
              className="text-white border-1 bg-gradient-to-r from-violet-800 to-blue-600 hover:from-violet-900 hover:to-blue-700 p-[5px] disabled:line-through rounded-full m-2 "
            >
              Add Quest
            </button>
            {/* Clear All Quests Button */}
            <button
              onClick={() => setTodos([])}
              className="text-white border-1 bg-red-600 hover:bg-red-700 p-[6px] rounded-full m-1"
            >
              ⚠️Clear All
            </button>
            {/* Toggle Completed Quests */}
            <label className="flex bg-red-600 m-1 p-[6px] border-1 rounded-full space-x-2 text-white max-w-[180px]">
              <input
                type="checkbox"
                checked={showfinished}
                onChange={toggleShowFinished}
                className="w-5 h-5 accent-purple-500 rounded cursor-pointer"
              />
              <span>Completed Quests</span>
            </label>
          </div>

          {/* Todo list display */}
          <h2 className="text-xl font-bold text-yellow-300">Your Quests</h2>

          {/* If no todos, show message */}
          {todos.length === 0 && (
            <div className="font-bold text-yellow-300 text-2xl m-4 p-4 flex items-center justify-center border-1 rounded-lg">
              No Quests Yet!
            </div>
          )}

          {/* List of todos */}
          {todos
            .filter((item) => !showfinished || item.isCompleted)
            .map((item) => {
              return (
                <div
                  key={item.id}
                  className="todos flex justify-between items-center border-1 border-white p-1 rounded-lg m-1"
                >
                  {/* Completion checkbox */}
                  <input
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => {
                      handleCheckbox(item.id);
                    }}
                    className="w-5 h-5 m-2 accent-blue-500 rounded-md cursor-pointer"
                  />

                  {/* Todo text with strikethrough if completed */}
                  <div
                    className={`text font-bold text-white break-words w-[240px] px-2 ${
                      item.isCompleted
                        ? "line-through decoration-black decoration-2"
                        : ""
                    }`}
                  >
                    {item.todo}
                  </div>

                  {/* Edit and delete buttons */}
                  <div className="buttons flex flex-row justify-end items-end">
                    <button
                      onClick={(e) => {
                        handleEdit(item.id);
                      }}
                      className="text-white bg-gradient-to-r from-violet-800 to-blue-600 hover:from-violet-900 hover:to-blue-700 p-[5px] transition-all duration-300-[5px] rounded-full m-2 w-[80px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(item.id);
                      }}
                      className="text-white bg-gradient-to-r from-violet-800 to-blue-600 hover:from-violet-900 hover:to-blue-700 p-[5px] transition-all duration-300p-[5px] rounded-full m-2 w-[80px]"
                    >
                      Surrender
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
