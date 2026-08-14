import prisma from "../prisma";

export const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};