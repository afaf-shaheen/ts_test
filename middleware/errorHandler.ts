import { Request,Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status_code = err.status_code || 500;
    const message = err.message || "Internal Server Error";
    res.status(status_code).json({message});
}