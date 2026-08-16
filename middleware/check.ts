import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env";
import { errorHandler } from "./errorHandler";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Access Denied" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(401).json({ message: "Invalid Token" });
        req.user = decoded;
        next();
    });
};