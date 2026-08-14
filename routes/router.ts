import { Router } from "express";
import { login } from "../controller/authController";
import { auth } from "../middleware/check";
import { getAllUsers } from "../controller/userController";
import { addTask } from "../controller/taskController";

const router = Router();

router.post("/login", login);

router.use(auth); 

router.get("/get_all_user", getAllUsers);
router.post("/task", addTask);

export default router;