'use client'

import { use, type ChangeEvent } from "react";
import { DEFAULT_SIDO, useOption } from "./provider";
import type { Dust } from "../prisma";

export default function SidoSelector({ dusts }: { dusts: Promise<Dust[]> }) {
    const { state, dispatch } = useOption();
    const { sido, bookmark } = state;
    const dustsResolved = use(dusts);
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
                        [DEFAULT_SIDO, ...dustsResolved
                            .map(x => x.sido)
                            .reduce((a, b) => a.includes(b) ? a : [...a, b], [] as string[])]
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