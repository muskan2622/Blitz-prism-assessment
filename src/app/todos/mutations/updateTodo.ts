// app/todos/mutations/updateTodo.ts
import db from "db"
import { Ctx } from "blitz"

export default async function updateTodo(
  input: { id: number; title?: string; completed?: boolean },
  ctx: Ctx
) {
  const todo = await db.todo.update({
    where: { id: input.id },
    data: input,
  })
  return todo
}
