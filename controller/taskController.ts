import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/check";
import prisma from "../prisma";
import * as taskService from "../service/taskService";

export const addTask = async (req: AuthRequest, res: Response) => {
    const task = await taskService.addTask({
        title: req.body.title,
        status: req.body.status,
        user_id: req.user!.id,
    })

    res.json({ message: "Task added successfully", task });
};

export const getTasks = async (req: AuthRequest, res: Response) => {
    res.json(await taskService.getTasks(req.query.status as string | undefined));
};

export const updateTask = async (req: AuthRequest,res: Response,) => {
    const task = await taskService.updateTask(
        Number(req.params.id),
        {
            title: req.body.title,
            status: req.body.status,
        });
        res.status(200).json(task);
    };

export const deleteTask = async (req: AuthRequest, res: Response) => {
    await taskService.deleteTask(Number(req.params.id));
    res.status(204).send();
};