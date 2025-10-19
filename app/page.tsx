import DustCardList from "../components/dustcard.js";
import OptionProvider from "../components/provider.js";
import { SidoSelector } from "../components/sidoselector.jsx";
import { PrismaClient } from "../generated/prisma/client.js";

export default async function Home() {
    const prisma = new PrismaClient();
    const dusts = await prisma.dust.findMany();

    return (
        <main>
            <OptionProvider>
                <DustCardList dusts={dusts} />
                <SidoSelector dusts={dusts} />
            </OptionProvider>
        </main>
    )
}
