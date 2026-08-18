import { Status } from "@prisma/client";
import prisma from "../prisma";
import { AppError } from "../utils/errors";

export const addTask = async ({
    title,
    status,
    user_id,
}: {
    title: string;
    status?: string;
    user_id: number;
}) => {
    if (!title) {
        throw new AppError("Title is required", 400);
    }

    const task = await prisma.task.create({
        data: {
            title,
            Status: status || "PENDING",
            user_id: user_id,
        },
    });

    return task;
};

export const getTasks = async (status?: string) => {
    return prisma.task.findMany({
        where: status
            ? { status: status as any }
            : undefined,

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

export const updateTask = async (
    id: number,
    data: {
        title?: string;
        status?: any;
    }
) => {
    try {
        return await prisma.task.update({
            where: { id },
            data: {
                title: data.title,
                status: data.status,
            },
        });
    } catch (err: any) {
        if (err.code === "P2025") {
            throw new AppError("Task not found", 404);
        }

        throw err;
    }
};

export const deleteTask = async (id: number) => {
    try {
        await prisma.task.delete({
            where: { id },
        });
    } catch (err: any) {
        if (err.code === "P2025") {
            throw new AppError("Task not found", 404);
        }

        throw err;
    }
};