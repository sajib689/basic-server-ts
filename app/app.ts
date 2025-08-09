import express, { Application, Request, Response } from "express";
import todosData from "../db/todo.json";
const app: Application = express();
import cors from "cors";
import { TodoType } from "./types/todoType";
app.use(express.json());
app.use(cors());
import fs from "fs";
import path from "path";
import { todo } from "node:test";
const todos: TodoType[] = todosData;

const todosFilePath = path.join(__dirname, "../db/todo.json");

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await todos;
    res.send(result);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await todos.find((t) => t.id === id);
    res.send(result);
  } catch (error) {
    console.error("Error fetching todo by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/todos", async (req: Request, res: Response) => {
  try {
    const newTodos = await req.body;
    const newId = todos.length + 1;

    newTodos.id = newId;

    const result = await todos.push(newTodos);
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const index = todos.findIndex((t) => t.id === id);

    const [deletedTodo] = todos.splice(index, 1);

    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
    res.status(200).send({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
