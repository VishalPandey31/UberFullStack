import { createContext, useState } from 'react';

export const CaptainDataContext = createContext(null);

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        color: "",
        plate: "",
        number: ""
    });

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;