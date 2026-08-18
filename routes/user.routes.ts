import { Router } from "express";
import { auth } from "../middleware/check";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controller/user.controller";

const router = Router();

router.use(auth);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;