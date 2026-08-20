import bcrypt from "bcrypt";
import prisma from "../prisma";

async function main() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await prisma.user.upsert({
        where: { email: "testtt@test.com" },
        update: {},
        create: {
            name: "testtt",
            email: "testtt@test.com",
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