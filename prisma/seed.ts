import bcrypt from "bcrypt";
import prisma from "../prisma";

async function main() {
    const hashedPassword = await bcrypt.hash("1234", 10);

    const user = await prisma.user.upsert({
        where: { email: "test@test.com" },
        update: {},
        create: {
            name: "test",
            email: "test@test.com",
            password: hashedPassword,
        },
    });

    console.log("Seeded user:", user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });