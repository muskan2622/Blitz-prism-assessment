import db from "db"
import { Ctx } from "blitz"

export default async function createTodo(
  input: { title: string },
  ctx: Ctx
) {
  const todo = await db.todo.create({
    data: input,
  })
  return todo
}

