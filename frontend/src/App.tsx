import AppHeader from "./components/AppHeader";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    );
}

export default App;
