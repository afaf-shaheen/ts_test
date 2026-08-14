import prisma from "../prisma";
import { Response } from "express";
import { AuthRequest } from "../middleware/check";

export const addTask = async (req: AuthRequest, res: Response) => {
    const { title, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await prisma.task.create({
        data: {
            title,
            status: status || "PENDING",
            user_id: req.user!.id,
        },
    });

    res.json({ message: "Task added successfully", task });
};