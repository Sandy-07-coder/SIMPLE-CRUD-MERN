import { useState, createContext, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used inside a UserProvider");
    }
    return context;
};