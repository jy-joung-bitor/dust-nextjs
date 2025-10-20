'use client'

import type { ChangeEvent } from "react";
import { useOption } from "./provider";
import type { Dust } from "../prisma";

export default function SidoSelector({ dusts }: { dusts: Dust[] }) {
    const { state, dispatch } = useOption();
    const { sido, bookmark } = state;
    console.log(state);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ sido: event.target.value });
    }
    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ bookmark: event.target.checked });
    }

    return (
        <aside>
            <label>Sido:
                <select name="sido" onChange={handleChange} value={sido}>
                    {
                        dusts
                            .map(x => x.sido)
                            .reduce((a, b) => a.includes(b) ? a : [...a, b], [] as string[])
                            .map(x => <option key={x} value={x}>{x}</option>)
                    }
                </select>
            </label>
            <label>bookmark?
                <input type="checkbox" name="bookmark" onChange={handleCheck} checked={bookmark} />
            </label>
        </aside>
    )
}