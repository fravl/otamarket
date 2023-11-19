import { useState } from "react";
import AppHeader from "./components/AppHeader";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./context/auth-context";

function App() {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <AppHeader />
            <Outlet />
        </AuthContext.Provider>
    );
}

export default App;
