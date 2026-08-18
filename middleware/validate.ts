import {Request, Response,NextFunction} from "express";
import { ZodSchema } from "zod";
import { AppError} from "../utils/errors";


export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const firstError = result.error.issues[0];
            return next(new AppError(firstError.message, 400));
        }

        req.body = result.data;
        next();
    };
};