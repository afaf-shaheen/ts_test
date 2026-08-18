import "dotenv/config";
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from environment variables");
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";