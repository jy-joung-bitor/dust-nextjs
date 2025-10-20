'use client'

import { prisma, type Dust } from "../prisma";
import { useOption } from "./provider";

function DustCard({ dust, handleClick }: { dust: Dust, handleClick: (id: string, bookmarked: boolean) => Promise<void> }) {
    const { id, bookmarked, sido, station, value, grade } = dust;

    return (
        <li onClick={() => handleClick(id, bookmarked)}>
            {sido} {station}: {grade}({value.toString()}) {bookmarked && '★'}
        </li>
    );
}

export default function DustCardList({ dusts, handleClick }: { dusts: Dust[], handleClick: (id: string, bookmarked: boolean) => Promise<void> }) {
    const { state } = useOption();
    const { sido, bookmark } = state;

    return (
        <ul>
            {
                dusts
                    .filter(dust => sido === "전국" || dust.sido === sido)
                    .filter(dust => !bookmark || dust.bookmarked)
                    .map((dust) => <DustCard key={dust.id} dust={dust} handleClick={handleClick} />)
            }
        </ul>
    )
}