import express from "express";
import {
  createTodo,
  deleteTodo,
  editTask,
  getTodos,
  updateTodo,
} from "../controller/todo_controller.js";
import { authentication } from "../middleware/authorize.js";

const router = express.Router();

router.post("/create", authentication, createTodo);
router.get("/fetch", authentication, getTodos);
router.put("/update/:id", authentication, updateTodo);
router.delete("/delete/:id", authentication, deleteTodo);
router.put("/edit/:id", authentication, editTask);

export default router;
