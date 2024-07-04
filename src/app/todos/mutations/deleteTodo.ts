// app/todos/mutations/deleteTodo.ts
import db from "db"
import { Ctx } from "blitz"

export default async function deleteTodo(
  input: { id: number },
  ctx: Ctx
) {
  await db.todo.delete({
    where: { id: input.id },
  })
}
