import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    status: z.enum(["PENDING", "DONE"], { message: "Invalid status" }).optional(),
});

export const updateTaskSchema = z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    status: z.enum(["PENDING", "DONE"], { message: "Invalid status" }).optional(),
});