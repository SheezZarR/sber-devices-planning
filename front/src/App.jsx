
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
			token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGE2NDZlMDc5NDA3MjNkMDk1NDQ5ZjRiNjNjNDc1ZGMyNzBlZTExNmEwN2Q0ZWFjNGNlYzY2ZGRiMmZmYzlhNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NDg2NDU3OCwiaWF0IjoxNjU0Nzc4MTY4LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNmE4ZGE1OTEtOTdmMC00NDk3LWE3YjYtZmJlZjQyMjk2YTA4Iiwic2lkIjoiMzJkOTk2YWItODc5My00NWM2LThjYTgtYzQzMmYyMWRjYjdjIn0.A0kbe85YuN4cOqtrs9PAkmle36MEWjajILgUC2rR5lfB3zmXE6gYI3JfVdivMBaM6lu1wknrHt35nQJf2Ska8AGE95eapMIkPxQqC3RVWcrBUqxqv2PmT0bSwgHyZKpnHe75qOnKdGffmy7Q36HzL1DPb2W1ujCPiLKwsTZoXlLG4niOMkDMMZJO-reGmd58TcyWUrONfJRWFXDwaer61KqUoNbwTJ6dfZPLemuWEbJHI-2e0fG9nqYT-oJZJV6VwsE3-uaW7UWxmg6JTb7ZPY3EHcnJDVnW8QlzPh97jOCFfQx2eQz7PGQWVoRfSOp5nYCDSSNvUpmT_yZuWMaF2Loej9Q5KyDW2Io57yh0-PwuK77KUdCV72XvbRrYLQTtMe8jwCdkq4bIZZq_t2bhDoPxMu-4sw-3ZUhm1zJ0dj4rL0bb5_S1RjSs9GmSZZxVh1-VNpbDI2EY0E96jCjXofWq2ktS0xT1w8-cS_G7nMH5TnRgnc0T8gcjSVQM1X-hDxbOt23a7qnC65jtbRdHt33B8lH0Uu1vXSDewwG3Ru73VMLJYsvCTtE7ptmHpzgSlhmcThKXWkSdUL_4ubbpEQ6lt2UG6N9txbBjdF0FedTHxd-7NrRLNE0Y_QesoMKoM-FRrXMMK58c8HnbjClVSFSk67ftuj299eD1mNKKlF4",
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

	useEffect(() => {
		assistant.current = initAssistant(() => assistantStateRef.current);
		assistant.current.on("data", ({ action }) => {
			console.log(action)
			if (action && action.type === "get_user_id") {
				setSberUserId(action['user_id']);
			}
		}) 
	}, [assistant, assistantStateRef]);

	function dispatchAssistantAction(action) {
		console.log("Assistant action");

	};

	const [tasks, setTasks] = useState(() => { return []; })
	const [modalActive, setModalActive] = useState(true)

    useEffect(() => {
        fetch(`http://127.0.0.1:8001/api/formated_tasks/`)
        .then(response => response.json())
        .then(json => setTasks(json))
    }, [])
  
	function updateTaskList() {
		fetch(`http://127.0.0.1:8001/api/formated_tasks/`)
        .then(response => response.json())
        .then(json => setTasks(json))
	}

  return (
		<div className='app-wrapper'>
			<Background_app/>
			<div className='app-content-wrapper'>
				<Navbar
					updateTaskList={updateTaskList}
					setModalActive={setModalActive}
				/>
				<Tasks taskList={tasks}/>
				<Calendar_menu/>
				
			</div>
			{/*<Achievements/>
			<Profile/>*/}
			<Modal sberUserId={sberUserId} active={modalActive} setModalActive={setModalActive}/>
		</div>
  );
}

export default App;