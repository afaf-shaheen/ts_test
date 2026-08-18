import { Request, Response, NextFunction } from "express";
import * as userService from "../service/userService";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ data: users });
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        res.status(200).json({ data: user });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.updateUser(Number(req.params.id), {
            name: req.body.name,
            email: req.body.email,
        });
        res.status(200).json({ data: user });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userService.deleteUser(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};