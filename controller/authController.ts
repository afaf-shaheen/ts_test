import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email and Password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
};