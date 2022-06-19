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
import { isConstructorDeclaration } from 'typescript';
import { act } from 'react-dom/test-utils';


const initAssistant = (getState) => {
	if (process.env.NODE_ENV === "development") {
		return createSmartappDebugger({
			token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGE2NDZlMDc5NDA3MjNkMDk1NDQ5ZjRiNjNjNDc1ZGMyNzBlZTExNmEwN2Q0ZWFjNGNlYzY2ZGRiMmZmYzlhNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NTY2ODM2MywiaWF0IjoxNjU1NTgxOTUzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiOGJkYTdjY2ItMDYxMy00MjQ4LWFkODAtMzVmNDI5OWIzOTMxIiwic2lkIjoiYTQ3YWU1ZDYtNzExOS00YzQ5LTk2MzItMjc2MGIzMmMxMmIxIn0.CVn0p4hAwoQWtPPrjhQmX2CCtJjCWCKppdYJNoHp484Ra8l3IgK3O6B-WVHaPDOC0Aj8FvZ5POhikxnINHe9_XXeS42u3yQhrAfD8b0FvTCltCeqqBggNFXaDDLRi0I-Vtm8Ov5dHLPeUrI6ycDx6iqlGI6cpD0B5kSDAol59bMZv9Y4x3SFuuQscMIofuFt0o45CeVXRxwyKdORIi3syFT6yxLAPaZ0HJu2ayZHXhLqlA8oSiJg-M07G3UowdqL4xYVuhtc6L1P3TMilIAa8idZwqNYvdj3WGqJDXk9X9N3RzZ-_b8HuL0RIyHb6L40Wa1XT8uELRqfb6dcHUEONXTz2HLWSRh7I1N3fh0JIYc1_uenAUW8O4l2GRTyHbMZWKYMO9UUB_JHjZ7B4wzRaG6i8rWIZjbLwE0K7yc0gPjsWJwcE0LakCx5I-4vVMlOY3SET5UtNrXe7NTnMD9S5Y--0C6zz9P9j7ce6JKS-vwiw1dZ9AwbKc8UHm8yu4MWxGD3mCERk6gfKKYCmbtKsz4iPDDLWi4x6ROpKqu2_TNEN_u1DHoHQuX8OJ5U1hsSv_U7glSjzSooFQT1bKdOMOm61xbddEcyoMuuxuMvgdXae35RB0j3OTBnzC6rtByt6yvOdMdep7PmUlim3A3QYqx3QiPFrLHKvjz8p54WOks",
			initPhrase: "Открой Plan Up",
			getState
		});
	}
	return createAssistant({getState});
}

const App = () => {
	

	const [tasks, setTasks] = useState(() => { return []; })
	const [modalActive, setModalActive] = useState(false)
	const [taskListHeadline, setTaskListHeadline] = useState("Активные")
	const [assistant, setAssistant] = useState();
	const [sberUserId, setSberUserId] = useState(null);

    useEffect(() => {
		console.log("Init...")
        updateTaskList("Активные")
		
		const assistantInit = initAssistant(() => {})
		assistantInit.on("data", ({ action }) => {
			console.log("Init action",action);
			if (action) {
				console.log("Получил голосовую/текстовую комманду от ассистента")
				console.log("Список задач у ассистента: ", tasks);
				dispatchAssistantAction(action);

				if (action && action.type === "get_user_id") {
					setSberUserId(action['user_id']);
				}
			}				
		})
		setAssistant(assistantInit);
    }, [])

	console.log("Список задач у приложения React: ", tasks);

	function assistantAddTask(assistantAction) {
		let pythonDate = null;
		let formData = new FormData();

		if (assistantAction.date){
			pythonDate = `${assistantAction.date.year}-${assistantAction.date.month}-${assistantAction.date.day}`;
			formData.append("completion_date", pythonDate);
		}

		formData.append("sber_user_id", sberUserId)
		formData.append("title", assistantAction.task_title);
		// formData.append("description", description);
		
		fetch(`http://127.0.0.1:8001/api/tasks/`, {
			method: "POST",
			body: formData
		})
		.then(response => response.json())
		.then(json => {
			updateTaskList("Активные");
		})
		.catch(error => {console.error(error)})
	}

	function changeTaskState(taskText) {
		console.log("changeTaskState tasks: ", tasks)		
		if (tasks.length > 0) {
			const cleanTask = tasks.find((l) => {
			
				const variable = l.tasks.filter(il => il.title.toLowerCase() == taskText.toLowerCase());
				
				if (variable && variable.length > 0) {
					return variable;
				}
			})
			
			let data = {
				"completion": (cleanTask.tasks[0].completion ? false : true)
			}
			
			fetch(`http://127.0.0.1:8001/api/tasks/${cleanTask.tasks[0].Task}/`, {
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(json => {
				removeTaskFromList(cleanTask.date, cleanTask.tasks[0].Task);
			})
			.catch(error => console.error(error));
		}
	}

	function assistantCompleteTask(action) {	
		if (action) {
			changeTaskState(action.task_title)
		}
	}

	function dispatchAssistantAction(action) {
		
		if (action && action.type) {
			switch(action.type) {
				case "add_task": 
					assistantAddTask(action);
					break;
				
				case "complete_task":
					assistantCompleteTask(action);
					break;
				
				default:
					// console.log("Idk what's dis");
					break;
			}
		}

	};


	function updateTaskList(location="Активные", dates=null) {
		let getUrlPrefix = "?"
		
		if (location === "Активные") {
			getUrlPrefix += "isCompleted=False"
		} else if (location === "Архив") {
			getUrlPrefix += "isCompleted=True"
		} else {
			getUrlPrefix += "";
		}
		

		if (dates !== null) {
			if (dates.length > 1) {
				getUrlPrefix += `&date_start_range=${dates[0]}&date_end_range=${dates[1]}`
			} else if (dates.length === 1) {
				getUrlPrefix += `&date=${dates[0]}`
			}
		}

		fetch(`http://127.0.0.1:8001/api/formated_tasks/${getUrlPrefix}`)
		.then(response => response.json())
		.then(json => {
			setTasks(json);
			setTaskListHeadline(location)
			
		})
		
	}

	function removeTaskFromList(taskDate, taskId){

		if (tasks.length !== 0) {
			const newList = structuredClone(tasks);
			const cleanedTaskList = tasks.find(el => el.date === taskDate).tasks.filter(el => el.Task !== taskId);
			const indToUpdate = tasks.findIndex(el => el.date === taskDate);
		
			if (indToUpdate !== -1) {
				newList[indToUpdate].tasks = cleanedTaskList;
			} else {
				console.log("Not found")
			}

			setTasks(newList);
			
		}
		
	}
	
  return (
		<div className='app-wrapper'>
			<Background_app/>
			<div className='app-content-wrapper'>
				<Navbar
					updateTaskList={updateTaskList}
					setTaskListHeadline={setTaskListHeadline}
					setModalActive={setModalActive}
				/>
				<Tasks headline={taskListHeadline} taskList={tasks} removeTaskFromList={removeTaskFromList}/>
				<Calendar_menu
					updateTaskList={updateTaskList}
					taskListHeadline={taskListHeadline}
				/>
				
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