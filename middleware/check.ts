import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: "Access Denied" });

    const secret = process.env.JWT_SECRET as string;
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) return res.status(401).json({ message: "Invalid Token" });
        req.user = decoded;
        next();
    });
};