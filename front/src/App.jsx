import React, { 
	useEffect,
	useRef,
	useState
} from 'react';
import {
	AssistantAppState,
	createSmartappDebugger,
	createAssistant,
} from "@sberdevices/assistant-client";

import {BrowserRouter , Route, Routes, Switch} from "react-router-dom";
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';
import Background_app from "./components/Background";
import Navbar from "./components/Navbar";
import Calendar_menu from "./components/Calendar";
import Modal from "./components/Modal";

import './Styles/Task_list.css';
import './Styles/Task_list_item.css';
import './Styles/Calendar.css';
import './Styles/App.css';


const initAssistant = (getState) => {
	if (process.env.NODE_ENV === "development") {
		return createSmartappDebugger({
			token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGE2NDZlMDc5NDA3MjNkMDk1NDQ5ZjRiNjNjNDc1ZGMyNzBlZTExNmEwN2Q0ZWFjNGNlYzY2ZGRiMmZmYzlhNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NTY0ODY1MywiaWF0IjoxNjU1NTYyMjQzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiMDk0OGFkYjEtMjcxNC00NjEwLWI2ZWEtNzZkY2I2YzFhNzU4Iiwic2lkIjoiZGRiMTEwZTYtNThiOC00MzE5LTk3MGYtMjRiOTMyYTgyNzVmIn0.YjOFb1ZcGlNWPN_K5t1kkPPFfns41V7WM8c-sfUjnM1WT8V4d_EPq88B1ckVM_Z1qK1bHq1g4-b6cpeu06xSXiBIfutxYed1lAGnMG9a3gB_8leWh0QD5sLdTjxryUp4prrLRML4n-Lcvo7JhCiuERuv-GZuCtpPoW24klcmzNYapjosSYOnZvrnpt_bvl5AIupAJ25aIXgAa5zf-rBiFEwFSI_TbGWr_WWqYa75GymnQaXri7c3zxRAVNveH2gVriX_rhD-r7_uTJ0VUNUQV2EvZk31SyBy4afMXJSYrcyaovHE5ELNf7Tk5fagFk0DsonjlMPlxUKv_DmnTVw-wExN9GDpptLZ4rAVvtYbej63gFcfZDT1wwajcs1SjV2hAPbr0lFPJKRYxztBWelNcBNxRLBjzsHLW2b0k8jN-UVJbbDcnyzYLl36acn3RsM8P8W_5eotolFv0B5aF4m9Ol0N0MSDX7tn5ckI63DSHQqCdLB_eWmS5elIt2pnCv0eluSA1vM_o86DB4mr6qsoK9DyIV7PG9BzyHflHEVAL66R4AZD_Y5lXoYVv4fO16qgIKZxX716iLXZjcgbclzUcJ8k3WPo_45Cw-8wsvGje4qz_nkv2zGjlT_olzdIgyAJZA-_STWPD2QKgyVMYG0U3793vvwJv83Ue6HxQcXSdZk",
			initPhrase: "Открой Plan Up",
			getState
		});
	}
	return createAssistant({getState});
}

const App = () => {
	const assistantStateRef = useRef(null);
	const assistant = useRef(null);
	const [sberUserId, setSberUserId] = useState(null);

	// useEffect(() => {
	//  	assistant.current = initAssistant(() => assistantStateRef.current);
	//  	assistant.current.on("data", ({ action }) => {
	//  		console.log(action)
	// 		// dispatchAssistantAction(action);
	//  		if (action && action.type === "get_user_id") {
	//  			setSberUserId(action['user_id']);
	//  		}
	//  	}) 
	//  }, [assistant, assistantStateRef]);

	function dispatchAssistantAction(action) {
		console.log(`Assistant action: ${JSON.stringify(action)}`);
		
		switch(action['type']) {
			case "add_note":
				console.log("Adding note")
				break;
			
			case "delete_note":
				console.log("Removing note")
				break;

			default:
				console.log(`Unknown action type: ${action['type']}`)
		}

	};

	const [tasks, setTasks] = useState(() => { return []; })
	const [modalActive, setModalActive] = useState(false)
	const [taskListHeadline, setTaskListHeadline] = useState("Активные")

    useEffect(() => {
        fetch(`http://127.0.0.1:8001/api/formated_tasks/?isCompleted=False`)
        .then(response => response.json())
        .then(json => setTasks(json))
    }, [])
  
	function updateTaskList(location = "home") {
		
		if (location === "home") {
			fetch(`http://127.0.0.1:8001/api/formated_tasks/?isCompleted=False`)
			.then(response => response.json())
			.then(json => {
				console.log(`Home json: ${JSON.stringify(json)}`); 
				setTasks(json); 
				setTaskListHeadline("Активные");
			})
			

		} else if (location === "archive") {
			fetch(`http://127.0.0.1:8001/api/formated_tasks/?isCompleted=True`)
			.then(response => response.json())
			.then(json => {
				console.log(`Archive json: ${JSON.stringify(json)}`)
				setTasks(json); 
				setTaskListHeadline("Архив")
			})
		}
		
	}

  return (
		<div className='app-wrapper'>
			<Background_app/>
			<div className='app-content-wrapper'>
				<Navbar
					updateTaskList={updateTaskList}
					setModalActive={setModalActive}
				/>
				<Tasks headline={taskListHeadline} taskList={tasks}/>
				<Calendar_menu/>
				
			</div>
			{/*<Achievements/>
			<Profile/>*/}
			<Modal 
				sberUserId={sberUserId} 
				active={modalActive} 
				setModalActive={setModalActive}
				updateTaskList={updateTaskList}
			/>
		</div>
  );
}

export default App;