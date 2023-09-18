import { createContext, useState, useEffect, useContext } from 'react';
const BASE_URL = "http://localhost:8000";


const CitiesContext = createContext();

function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    
    
    
    useEffect(() => {
        async function fetchCities(){
            try{
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`);
                const json = await response.json();
                setCities(json);
            }catch(error){
                console.error("Error:", error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);
    
    return (
        <CitiesContext.Provider value={{cities, isLoading}}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined){
        throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
}


export {CitiesProvider, useCities};
