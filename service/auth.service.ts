import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { JWT_SECRET } from "../config/env";
import { AppError } from "../utils/errors";

export const register = async ({name,email,password,}: 
    {
    name: string;
    email: string;
    password: string;
}) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return user;
    } catch (err: any) {
        if (err.code === "P2002") {
            throw new AppError("Email already exists", 409);
        }

        throw err;
    }
};

export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new AppError("Invalid Credentials", 401);
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    return token;
};