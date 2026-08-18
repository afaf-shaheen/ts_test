import { Router } from "express";
import { auth } from "../middleware/check";
import { addTask, getTasks, updateTask, deleteTask } from "../controller/taskController";

const router = Router();

router.use(auth);

router.post("/", addTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;