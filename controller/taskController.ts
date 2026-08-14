import prisma from "../prisma";

export const addTask = async (req: any, res: any) => {
    const { title, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await prisma.task.create({
        data: {
            title,
            status: status || "PENDING",
            user_id: req.user.id,
        },
    });

    res.json({ message: "Task added successfully", task });
};