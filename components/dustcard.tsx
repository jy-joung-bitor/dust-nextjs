import { type Dust, PrismaClient } from "../generated/prisma/client.js";
import { useOption } from "./provider.js";

export function DustCard({ dust }: { dust: Dust }) {
    const { id, bookmarked, sido, station, value, grade } = dust;

    const handleClick = async (id: string, bookmarked: boolean) => {
        const prisma = new PrismaClient();
        await prisma.dust.update({
            where: {
                id,
            },
            data: {
                bookmarked: !bookmarked,
            }
        });

        globalThis.location.reload();
    }

    return (
        <li onClick={() => handleClick(id, bookmarked)}>
            {sido} {station}: {grade}({value.toString()}) {bookmarked && '★'}
        </li>
    );
}

export default function DustCardList({ dusts }: { dusts: Dust[] }) {
    const { state } = useOption();
    const { sido, bookmark } = state;

    return (
        <ul>
            {
                dusts
                    .filter(dust => sido === "전국" || dust.sido === sido)
                    .filter(dust => !bookmark || dust.bookmarked)
                    .map((dust) => <DustCard key={dust.id} dust={dust} />)
            }
        </ul>
    )
}