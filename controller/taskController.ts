import { Response } from "express";
import { AuthRequest } from "../middleware/check";
import prisma from "../prisma";

export const addTask = async (req: AuthRequest, res: Response) => {
    const { title, status } = req.body;

    if (!title) {
        const error: any = new Error("Title is required");
        error.statusCode = 400;
        throw error;
    }

    const task = await prisma.task.create({
        data: {
            title,
            status: status || "PENDING",
            user_id: req.user!.id,
        },
    });

    res.json({ message: "Task added successfully", task });
};

export const getTasks = async (req: AuthRequest, res: Response) => {
    const { status } = req.query;
    const tasks = await prisma.task.findMany({
        where: status ? { status: status as any } : undefined,
        include: { user: { select: { id: true, name: true, email: true } } },
    });

    res.json(tasks);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    
    const { title, status } = req.body;

    try {
        const task = await prisma.task.update({
            where: { id: Number(id) },
            data: { title, status },
        });
        res.json(task);
    } catch (err: any) {
        if (err.code === "P2025") {
            const error: any = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }
        throw err;
    }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.task.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (err: any) {
        if (err.code === "P2025") {
            const error: any = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }
        throw err;
    }
    res.json({ message: "Task deleted successfully"});
};