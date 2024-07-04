import db from "db"

export default async function getTodos() {
  const todos = await db.todo.findMany()
  return todos
}
