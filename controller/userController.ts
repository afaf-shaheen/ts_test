import { Request, Response } from "express";
import prisma from "../prisma";
import * as userService from "../service/userService";

export const getAllUsers = async (req: Request, res: Response) => {
    res.json(await userService.getAllUsers());
};

export const getUserById = async (req: Request, res: Response) => {
    res.json(await userService.getUserById(Number(req.params.id)));
};

export const updateUser = async (req: Request, res: Response) => {
    res.json(await userService.updateUser(Number(req.params.id), { name: req.body.name, email: req.body.email }));
};

export const deleteUser = async (req: Request, res: Response) => {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
};