import { Status } from "../generated/prisma/enums";
import prisma from "../prisma";
import { AppError } from "../utils/error.util";

export const addTask = async ({
    title,
    status,
    user_id,
}: {
    title: string;
    status?: Status | string;
    user_id: number;
}) => {
    const task = await prisma.task.create({
        data: {
            title,
            status: (status as Status | undefined) ?? Status.PENDING,
            user_id: user_id,
        },
    });

    return task;
};

export const getTasks = async (userId: number, status?: string) => {
    return prisma.task.findMany({
        where: {
            user_id: userId,
            ...(status ? { status: status as Status } : {}),
        },
        include: {
            user: {
                select: { id: true, name: true, email: true },
            },
        },
    });
};

export const updateTask = async (
    id: number,
    userId: number,
    data: { title?: string; status?: any }
) => {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    if (task.user_id !== userId) {
        throw new AppError("Not authorized to modify this task", 403);
    }

    return await prisma.task.update({
        where: { id },
        data: { title: data.title, status: data.status },
    });
};

export const deleteTask = async (id: number, userId: number) => {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    if (task.user_id !== userId) {
        throw new AppError("Not authorized to delete this task", 403);
    }

    await prisma.task.delete({ where: { id } });
};