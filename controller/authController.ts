import { Request, Response, NextFunction } from "express";
import * as authService from "../service/authService";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authService.register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json({ message: "User created successfully", data: user });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await authService.login({
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json({ message: "Login successful", data: { token } });
    } catch (err) {
        next(err);
    }
};