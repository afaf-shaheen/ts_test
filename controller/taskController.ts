import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/check";
import * as taskService from "../service/taskService";

export const addTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const task = await taskService.addTask({
            title: req.body.title,
            status: req.body.status,
            user_id: req.user!.id,
        });
        res.status(201).json({ message: "Task added successfully", data: task });
    } catch (err) {
        next(err);
    }
};

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.getTasks(req.query.status as string | undefined);
        res.status(200).json({ data: tasks });
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const task = await taskService.updateTask(Number(req.params.id), {
            title: req.body.title,
            status: req.body.status,
        });
        res.status(200).json({ data: task });
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        await taskService.deleteTask(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};