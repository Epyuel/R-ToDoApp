import { createContext } from "react";

const AppContext = createContext<any>({
    isDarkMode: false, 
    setIsDarkMode: () => {} // A dummy function to prevent errors during initialization
});

export default AppContext;