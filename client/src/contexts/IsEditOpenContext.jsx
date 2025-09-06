import { createContext, useContext, useState } from "react";

const IsEditOpenContext = createContext();

export function IsEditOpenProvider({ children }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [ID, setID] = useState(null);

    return (
        <IsEditOpenContext.Provider value={{ isEditOpen, setIsEditOpen, ID, setID }}>
            {children}
        </IsEditOpenContext.Provider>
    );
}

//custom hook
export const useIsEditOpen = () => {
    const context = useContext(IsEditOpenContext);
    if (!context) {
        throw new Error("useIsEditOpen must be used inside a IsEditOpenProvider");
    }
    return context;
}