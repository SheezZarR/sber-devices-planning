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
			token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGE2NDZlMDc5NDA3MjNkMDk1NDQ5ZjRiNjNjNDc1ZGMyNzBlZTExNmEwN2Q0ZWFjNGNlYzY2ZGRiMmZmYzlhNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NTgwNDQ2MywiaWF0IjoxNjU1NzE4MDUzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiYWU5MmRlNjMtODY5My00MTM3LWE5ZmEtYTBjY2Y3YjQ1NTc0Iiwic2lkIjoiM2U3YzNiNDEtNjkxYy00MTk2LTg4MTYtOTExMzlmOThiYTFlIn0.UPatgNSCaDvmRvgsLcU5dB-Uvl9WVJkP-q9D_TMjTVc_mqbU_ZOU77QARDhJUMoce-6-JGf_Y_kRuNNYTnJFp0H0WFoMzm7zcwNFOwQzsFT-BiE-z6jzjrTfG0Wn-rkcx3nClNm6By5bN5Pj119puOZCZ9bdBj7b9FQHeA3tb9crmKjygpInDf0HI0G8hkjrn_y3B7r8heDukmCY2HBLwOq9auO65MY799fHi_Z5Uvk8IkmKV8b5uYB0d_L2eWTnNxgjGAmVZOstOO6Vh3ERxQp0i2dFk5fNtGL4oNRJPVlenKyUNq6Hq9GxXLhkwWuM6qlTwkMvAH4aVNuEjiqNx3jVUCns_fSV55UPicI-bfw9soOYHYNi3yQ0m8ehieJpVHT0a1JfL4ltmf6lcjQGpUrYUf1VFTCS-Tob8GtXzqaMROmiLdzaVx6oj0cDpKh04gTVtCrjmtyCVl8Pe2uPJtZ4TweeJgN6jIhAay_clyYM69LsgIPzkBs7nxnOMqrikL3XvMcYMxQnIqKh7M5yBd7DMjRn4awVBQNgV5Fl_WirRkFgwnbzkEZTDIyJfNtuucPj798bAeazgQlrtMpc5lLPuCoP4E8Z8C-lfhrU8xIXBUZ2cV1FGsq_u53GyiOst1j9NSUqRnaWkr_yuVCRS3y5OfoklgVYl97HXoWwSP8",
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

    const url = `http://127.0.0.1:8001/api/tasks/`;
		fetch(url, {
			method: "POST",
			body: formData
		})
		.then(response => response.json())
		.then(json => {
      console.log(`>>> POST ${url}: res:`, json)
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

      const url = `http://127.0.0.1:8001/api/tasks/${cleanTask.tasks[0].Task}/`;
			fetch(url, {
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(json => {
        console.log(`>>> PATCH ${url}: res:`, json)
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

    const url = `http://127.0.0.1:8001/api/formated_tasks/${getUrlPrefix}`;
		fetch(url)
		.then(response => response.json())
		.then(json => {
      console.log(`>>> GET ${url}: res:`, json)
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
