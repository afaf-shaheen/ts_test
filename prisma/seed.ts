import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await prisma.user.create({
        data: {
            name: "Shahd",
            email: "shahd@test.com",
            password: hashedPassword,
        },
    });

    console.log("Seeded user:", user);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());