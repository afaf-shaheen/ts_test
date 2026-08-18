import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { JWT_SECRET } from "../config/env";
import *  as authService from "../service/authService";

export const register = async (req: Request, res: Response) => {
    const user = await authService.register({name: req.body.name,email: req.body.email,password: req.body.password,});
    res.status(201).json({message: "User created successfully",user,});
};

export const login = async (req: Request, res: Response) => {
    const token = await authService.login({email: req.body.email,password: req.body.password,});
        res.status(200).json({message: "Login successful",token,});
};