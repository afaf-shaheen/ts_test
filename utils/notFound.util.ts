import { AppError } from "./error.util";

export const handleNotFound = (err: any, entityName: string) => {
    if (err.code === "P2025") throw new AppError(`${entityName} not found`, 404);
    throw err;
};