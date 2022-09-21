import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
    try {
        const properties = await prisma.Properties.findMany({
            include: {
                city: true,
                offer: true,
                category: true,
            },
        });
        res.status(200).json(properties);
    } catch (error) {
        console.log(error)
        res.send('hubo un error', error)
    }
}
