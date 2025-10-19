import type { ChangeEvent } from "react";
import { useOption } from "./provider.js";
import type { Dust } from "@prisma/client";

export function SidoSelector({ dusts }: { dusts: Dust[] }) {
    const { state, dispatch } = useOption();
    const { sido, bookmark } = state;

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ sido: event.target.value });
    }

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ bookmark: event.target.checked });
    }

    return (
        <aside>
            <select onChange={handleSelect} value={sido}>
                {
                    dusts
                        .map(x => x.sido)
                        .reduce((a, b) => a.includes(b) ? a : [...a, b], [] as string[])
                        .map(x => <option key={x} value={x}>{x}</option>)
                }
            </select>
            <label>bookmarked
                <input type="checkbox" onChange={handleCheck} checked={bookmark} />
            </label>
        </aside>
    )
}