'use client'

import { updateBookmarked } from "@/app/action";
import { Dust } from "@/generated/prisma/client";
import { useOption } from "./provider";
import { use } from "react";

function DustCard({ dust }: { dust: Dust }) {
    const { id, bookmarked, sido, station, value, grade } = dust;

    return (
        <li onClick={() => updateBookmarked(id, bookmarked)}>
            {sido} {station}: {grade}({value.toString()}) {bookmarked && '★'}
        </li>
    );
}

export default function DustCardList({ dusts }: { dusts: Promise<Dust[]> }) {
    const { state } = useOption();
    const { sido, bookmark } = state;
    const dustsResolved = use(dusts);

    return (
        <ul>
            {
                dustsResolved
                    .filter(dust => sido === "전국" || dust.sido === sido)
                    .filter(dust => !bookmark || dust.bookmarked)
                    .map((dust) => <DustCard key={dust.id} dust={dust} />)
            }
        </ul>
    )
}