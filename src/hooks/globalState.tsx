import React, { useState, createContext, useMemo, useContext, PropsWithChildren } from "react";

interface LoggedState {
    logged: boolean;
    setLogged: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

interface UserIdState {
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>> | undefined;
}

const loggedInitialState: LoggedState = { logged: false, setLogged: undefined };
const userIdInitialState: UserIdState = { userId: '', setUserId: undefined };

const LoggedStateContext = createContext(loggedInitialState);
const UserIdStateContext = createContext(userIdInitialState);

export const GlobalStateProvider = ({ children }: PropsWithChildren<any>) => {
    const [logged, setLogged] = useState(loggedInitialState.logged);
    const [userId, setUserId] = useState(userIdInitialState.userId);

    const loggedContextValue = useMemo(() => ({ logged, setLogged }), [logged]);
    const userIdContextValue = useMemo(() => ({ userId, setUserId }), [userId]);

    return (
        <LoggedStateContext.Provider value={loggedContextValue}>
            <UserIdStateContext.Provider value={userIdContextValue}>
                {children}
            </UserIdStateContext.Provider>
        </LoggedStateContext.Provider>
    );
};

export const useLoggedState = () => useContext(LoggedStateContext);
export const useUserIdState = () => useContext(UserIdStateContext);