'use client'

import { createContext, useContext, useReducer } from "react";

type Option = {
    sido: string;
    bookmark: boolean;
}

type OptionTools = {
    state: Option;
    dispatch: (action: Partial<Option>) => void;
}

const DEFAULT_OPTION: Option = { sido: "전국", bookmark: false };

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