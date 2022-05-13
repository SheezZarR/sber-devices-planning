import React from 'react'
import {
    createSmartappDebugger,
    createAssistant,
} from "@sberdevices/assistant-client";

import {BrowserRouter , Route, Routes, Switch} from "react-router-dom";
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import Achievements from './pages/Achievements'
import Background_app from "./components/Background";
import Navbar from "./components/Navbar";

const App = () => {
  return (
        <div className='app-wrapper'>
            <Background_app/>
            <Navbar/>
            <div class='app-wrapper-content'>
                <Tasks/>
                {/*<Achievements/>
                <Profile/>*/}
            </div>
        </div>
  );
}

export default App;