import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "../api/apiSlice";
import { FaUpload } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { useState } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex justify-between items-center border border-solid border-gray-700 mb-4"
    >
      <label className="absolute left-[-100000px]" htmlFor="new-todo">
        Enter a new todo item
      </label>
      <div className="new-todo">
        <input
          className="w-full pr-[30px] p-2 rounded-md border border-solid border-gray-700 focus:bg-green-300 submit-hover:bg-green-300"
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="min-w-50 min-h-50 text-blue-600">
        <FaUpload />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      //  JSON.stringify(todos);

      return (
        <article
          key={todo.id}
          className="font-nunito text-lg p-4 flex justify-between items-center border border-gray-400"
        >
          <div className="flex justify-start items-center">
            <input
              className="min-w-30 min-h-30 mr-4"
              type="checkbox"
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button
            className="min-w-50 min-h-50 rounded-10 cursor-pointer bg-white text-pink-400 focus:filter brightness-120 trash-hover:filter brightness-120"
            onClick={() => deleteTodo({ id: todo.id })}
          >
            <FaTrashAlt />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
