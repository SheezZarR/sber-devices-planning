
import React, { 
	useEffect,
	useRef 
} from 'react'
import {
	AssistantAppState,
	createSmartappDebugger,
	createAssistant,
} from "@sberdevices/assistant-client";

import {BrowserRouter , Route, Routes, Switch} from "react-router-dom";
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import Achievements from './pages/Achievements'
import Background_app from "./components/Background";
import Navbar from "./components/Navbar";

import './Styles/Task_list.css'
import './Styles/Task_list_item.css'
import './Styles/Calendar.css'
import './Styles/App.css'


const initAssistant = (getState) => {
	if (process.env.NODE_ENV === "development") {
		return createSmartappDebugger({
			token: process.env['REACT_APP_TOKEN'] ?? "",
			initPhrase: "Открой Plan Up",
			getState
		});
	}
	return createAssistant({getState});
}

const App = () => {
	const assistantStateRef = useRef(null);
	const assistant = useRef(null);

	useEffect(() => {
		assistant.current = initAssistant(() => assistantStateRef.current);
		assistant.current.on("data", ({ action }) => {
			console.log(action);
		}) 
	});
  
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