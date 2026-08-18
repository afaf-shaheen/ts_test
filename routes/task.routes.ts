import { Router } from "express";
import { auth } from "../middleware/check";
import { validate } from "../middleware/validate";
import { taskSchema } from "../validators/task.validatoes";
import { addTask, getTasks, updateTask, deleteTask } from "../controller/task.controller";

const router = Router();

router.use(auth);

router.post("/", validate(taskSchema), addTask);
router.get("/", getTasks);
router.put("/:id", validate(taskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;