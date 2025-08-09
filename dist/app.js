"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_json_1 = __importDefault(require("../db/todo.json"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const todos = todo_json_1.default;
const todosFilePath = path_1.default.join(__dirname, "../db/todo.json");
app.get("/todos", async (req, res) => {
    try {
        const result = await todos;
        res.send(result);
    }
    catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/todos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await todos.find((t) => t.id === id);
        res.send(result);
    }
    catch (error) {
        console.error("Error fetching todo by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/todos", async (req, res) => {
    try {
        const newTodos = await req.body;
        const newId = todos.length + 1;
        newTodos.id = newId;
        const result = await todos.push(newTodos);
        fs_1.default.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
        res.status(201).send(result);
    }
    catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.delete("/todos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const index = todos.findIndex((t) => t.id === id);
        const [deletedTodo] = todos.splice(index, 1);
        fs_1.default.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
        res.status(200).send({ message: "Todo deleted successfully", deletedTodo });
    }
    catch (error) {
        console.error("Internal server error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
exports.default = app;
