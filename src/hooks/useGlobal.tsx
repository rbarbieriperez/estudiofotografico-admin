import React from "react";
import { TDriveData, TEvent, TUserLoginData } from "../types/types";

type TToast = {
    variant: 'error' | 'success';
    message: string;
    timeout?: number;
}

type TGlobalContext = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    showToast: (config: TToast) => void;
    closeToast: () => void;
    toast: TToast | undefined;
    driveData: TDriveData | undefined;
    setDriveData: React.Dispatch<React.SetStateAction<TDriveData | undefined>>;
    loginData: TUserLoginData | undefined;
    setLoginData: React.Dispatch<React.SetStateAction<TUserLoginData | undefined>>;
    events: TEvent[] | undefined;
    setEvents: React.Dispatch<React.SetStateAction<TEvent[] | undefined>>;
    taskInProgress: Boolean;
    setTaskInProgress: React.Dispatch<React.SetStateAction<Boolean>>;
    shouldRefresh: Boolean;
    setShouldRefresh: React.Dispatch<React.SetStateAction<Boolean>>;
}

const GlobalContext = React.createContext<TGlobalContext>({} as TGlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = React.useState(false);
    const [toast, setToast] = React.useState<TToast>();
    const [driveData, setDriveData] = React.useState<TDriveData>();
    const [loginData, setLoginData] = React.useState<TUserLoginData>();
    const [events, setEvents] = React.useState<TEvent[]>();
    const [taskInProgress, setTaskInProgress] = React.useState<Boolean>(false);
    const [shouldRefresh, setShouldRefresh] = React.useState<Boolean>(false);

    /**
     * Show Toast
     */
    const showToast = React.useCallback((config: TToast) => {
        setToast(config);
    }, []);

    /**
     * Close toast
     */
    const closeToast = React.useCallback(() => {
        setToast(undefined);
    }, []);

    
    return (
        <GlobalContext.Provider value={{ loading, setLoading, showToast, toast, closeToast, driveData, setDriveData, loginData, setLoginData, events, setEvents, taskInProgress, setTaskInProgress, shouldRefresh, setShouldRefresh }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobal = () => React.useContext(GlobalContext);