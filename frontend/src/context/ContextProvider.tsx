"use client";
import reducer, { initialState } from "./AppReducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ActionTypes, ContextTypes, State } from "@/constants/types";

const AppContext = createContext<ContextTypes | undefined>(undefined);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(
        reducer as React.Reducer<State, ActionTypes>,
        initialState
    );

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default ContextProvider;

export const useAppContext = (): State => {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("useAppContext must be used within a ContextProvider");

    return context.state;
};

export const useAppDispatch = (): React.Dispatch<ActionTypes> =>
    useContext(AppContext)?.dispatch || (() => null);
