import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "../api/apiSlice";
import { FaUpload, FaTrashAlt, FaEdit, FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState(null);

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

  //editTodo
  const handleEditSubmit = (e, editedTodo) => {
    e.preventDefault();
    updateTodo({
      id: editedTodo.id,
      title: editedTodo.title,
      completed: editedTodo.completed,
    });
    setEditedTodo(null);
  };

  const newItemSection = (
    <div className="flex justify-center mt-[6%]">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 p-4 flex justify-between items-center border border-solid border-gray-400 mb-4 rounded-xl shadow-md"
      >
        <label className="absolute left-[-100000px] " htmlFor="new-todo">
          Enter a new todo item
        </label>
        <div className="new-todo">
          <input
            className="pr-[30px] p-2 !outline-none "
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
        </div>
        <button className="text-2xl text-yellow-600">
          <FaUpload />
        </button>
      </form>
    </div>
  );

  //editTodo
  let editedTodoSection;
  if (editedTodo !== null) {
    editedTodoSection = (
      <div className="flex justify-center">
        <form
          onSubmit={(e) => handleEditSubmit(e, editedTodo)}
          className="w-1/2 p-4 flex justify-between items-center border border-solid border-gray-700 mb-4 rounded-xl shadow-md"
        >
          <label className="absolute left-[-100000px]" htmlFor="edit-todo">
            Edit todo item
          </label>
          <div className="edit-todo">
            <input
              className="pr-[30px] p-2 !outline-none"
              type="text"
              id="edit-todo"
              value={editedTodo.title}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, title: e.target.value })
              }
              placeholder="Edit todo"
            />
          </div>
          <button className="min-w-50 min-h-50 text-red-600">
            <FaPencilAlt />
          </button>
        </form>
      </div>
    );
  } else {
    editedTodoSection = null;
  }

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      //  JSON.stringify(todos);

      return (
        <div className="flex justify-center font-nunito">
          <article
            key={todo.id}
            className="w-1/2 font-nunito text-lg p-4 flex  border border-gray-400 rounded-xl shadow-md mb-5 relative"
          >
            <div className="flex  ">
              <input
                type="checkbox"
                className="mr-4 bg-red-500 border-red-300 text-red-500  cursor-pointer"
                id={todo.id}
                onChange={() =>
                  updateTodo({ ...todo, completed: !todo.completed })
                }
              />
              <label htmlFor={todo.id}>{todo.title}</label>
            </div>
            <div className="absolute right-4 space-x-3">
              <button
                className="bg-white text-yellow-900 "
                onClick={() => deleteTodo({ id: todo.id })}
              >
                <FaTrashAlt />
              </button>
              <button
                className=" bg-white text-green-700"
                onClick={() => setEditedTodo(todo)}
              >
                <FaEdit />
              </button>
            </div>
          </article>
        </div>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1 className="text-center font-nunito font-bold text-4xl text-yellow-500 mt-[4%] drop-shadow-md">
        Todo List 📝
      </h1>
      {newItemSection}
      {editedTodoSection}
      {content}
    </main>
  );
};
export default TodoList;
