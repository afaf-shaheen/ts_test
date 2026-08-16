import { Router } from "express";
import { register, login } from "../controller/authController";
import { auth } from "../middleware/check";
import { getAllUsers , getUserById,deleteUser,updateUser} from "../controller/userController";
import { addTask , deleteTask,updateTask,getTasks} from "../controller/taskController";



const router = Router();

router.post("/register", register);
router.post("/login", login);


router.use(auth); 

router.get("/get_all_user", getAllUsers);
router.get("/get_user/:id", getUserById);
router.put("/update_user/:id", updateUser);
router.delete("/delete_user/:id", deleteUser);
router.post("/add_task", addTask);
router.get("/get_task", getTasks);
router.put("/update_task/:id", updateTask);
router.delete("/delete_task/:id", deleteTask);

export default router;