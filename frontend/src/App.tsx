import React from "react";
import Navbar from "./components/Navbar";
import AllPage from "./components/AllPage";
import AppHeader from "./components/AppHeader";

function App() {
    return (
        <div className="App">
            <AppHeader />
            <Navbar />
            <AllPage />
        </div>
    );
}

export default App;
