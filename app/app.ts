import { response } from "express";
import { request } from "express";

const express = require("express");
const app = express();

app.get("/", (req: request, res: response) => {
  res.send("Hello World!");
});

export default app;
