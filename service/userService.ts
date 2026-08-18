import prisma from "../prisma";
import { AppError } from "../utils/errors";

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

export const getUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            tasks: true,
        },
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

export const updateUser = async (
    id: number,
    data: {
        name?: string;
        email?: string;
    }
) => {
    try {
        return await prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    } catch (err: any) {
        if (err.code === "P2025") {
            throw new AppError("User not found", 404);
        }

        throw err;
    }
};

export const deleteUser = async (id: number) => {
    try {
        await prisma.user.delete({
            where: { id },
        });
    } catch (err: any) {
        if (err.code === "P2025") {
            throw new AppError("User not found", 404);
        }

        throw err;
    }
};