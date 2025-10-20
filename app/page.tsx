import DustCardList from "../components/dustcard";
import OptionProvider from "../components/provider";
import SidoSelector from "../components/sidoselector";
import { prisma } from "../prisma";

export default async function Home() {
    const dusts = await prisma.dust.findMany();
    
        const handleClick = async (id: string, bookmarked: boolean) => {
            'use server'
            await prisma.dust.update({
                where: {
                    id,
                },
                data: {
                    bookmarked: !bookmarked,
                }
            });
        }

    return (
        <main>
            <OptionProvider>
                <DustCardList dusts={dusts} handleClick={handleClick} />
                <SidoSelector dusts={dusts} />
            </OptionProvider>
        </main>
    )
}
