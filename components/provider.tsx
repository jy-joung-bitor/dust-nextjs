'use client'

import { env } from "node:process";
import { createContext, useContext, useReducer } from "react";

type Option = {
    sido: string;
    bookmark: boolean;
}

type OptionTools = {
    state: Option;
    dispatch: (action: Partial<Option>) => void;
}

export const DEFAULT_SIDO = env['NEXT_PUBLIC_DEFAULT_SIDO'] || "전국";
const DEFAULT_OPTION: Option = { sido: DEFAULT_SIDO, bookmark: false };

const reducer = (state: Option, action: Partial<Option>): Option => {
    return { ...state, ...action };
}

const OptionContext = createContext<OptionTools>({ 
    state: DEFAULT_OPTION, 
    dispatch: () => { }  
});

export function useOption() {
    return useContext(OptionContext);
}

export default function OptionProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, DEFAULT_OPTION);
    return (
        <OptionContext value={{ state, dispatch }}>
            {children}
        </OptionContext>
    )
}