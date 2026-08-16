import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
    });
    res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: { id: true, name: true, email: true, tasks: true },
    });

    if (!user) {
        const error: any = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email },
            select: { id: true, name: true, email: true },
        });
        res.json(user);
    } catch (err: any) {
        if (err.code === "P2025") {
            const error: any = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        throw err;
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (err: any) {
        if (err.code === "P2025") {
            const error: any = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        throw err;
    }
};