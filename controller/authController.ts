import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { JWT_SECRET } from "../config/env";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
            select: { id: true, name: true, email: true },
        });
        res.status(201).json({ message: "User created successfully", user });
    } catch (err: any) {
        if (err.code === "P2002") {
            const error: any = new Error("Email already exists");
            error.statusCode = 409;
            throw error;
        }
        throw err;
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and Password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const error: any = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error: any = new Error("Invalid Credentials");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
};