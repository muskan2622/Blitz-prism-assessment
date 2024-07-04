"use client"

import { useState, FormEvent } from "react";
import { useMutation, useQuery } from "@blitzjs/rpc";
import createTodo from "./todos/mutations/createTodo";
import getTodos from "./todos/queries/getTodos";
import updateTodo from "./todos/mutations/updateTodo";
import deleteTodo from "./todos/mutations/deleteTodo";
import { Todo } from "@prisma/client";
import "./styles/globals.css"

const Home = () => {
  const [todos] = useQuery(getTodos, undefined);
  const [createTodoMutation] = useMutation(createTodo);
  const [updateTodoMutation] = useMutation(updateTodo);
  const [deleteTodoMutation] = useMutation(deleteTodo);

  const [newTodo, setNewTodo] = useState("");

  const handleCreateTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    await createTodoMutation({ title: newTodo });
    setNewTodo("");
  };

  const handleUpdateTodo = async (todo: Todo) => {
    await updateTodoMutation({ id: todo.id, completed: !todo.completed });
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation({ id });
  };

  return (
    <div className="p-4">
      <div className="bg-blue-500 text-white p-4">
  Hello, This is Assignment!
</div>
    <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
    <form onSubmit={handleCreateTodo} className="mb-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id} className="flex justify-between items-center mb-2 p-2 bg-white shadow-md rounded-lg">
          <span className={todo.completed ? "line-through" : ""}>
            {todo.title}
          </span>
          <div>
            <button
              onClick={() => handleUpdateTodo(todo)}
              className={`ml-2 ${todo.completed ? 'bg-gray-400' : 'bg-yellow-500'} text-white px-4 py-2 rounded`}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  
  );
};

export default Home;
