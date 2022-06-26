import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  AssistantAppState,
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";

import {BrowserRouter, Route, Routes, Switch} from "react-router-dom";
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


const BASE_URL = 'http://127.0.0.1:8001'
// const BASE_URL = 'http://ocatano.eu.pythonanywhere.com'


const initAssistant = (getState) => {
  console.log('initAssistant')
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      //token:
      // "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGE2NDZlMDc5NDA3MjNkMDk1NDQ5ZjRiNjNjNDc1ZGMyNzBlZTExNmEwN2Q0ZWFjNGNlYzY2ZGRiMmZmYzlhNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NTgwNDQ2MywiaWF0IjoxNjU1NzE4MDUzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiYWU5MmRlNjMtODY5My00MTM3LWE5ZmEtYTBjY2Y3YjQ1NTc0Iiwic2lkIjoiM2U3YzNiNDEtNjkxYy00MTk2LTg4MTYtOTExMzlmOThiYTFlIn0.UPatgNSCaDvmRvgsLcU5dB-Uvl9WVJkP-q9D_TMjTVc_mqbU_ZOU77QARDhJUMoce-6-JGf_Y_kRuNNYTnJFp0H0WFoMzm7zcwNFOwQzsFT-BiE-z6jzjrTfG0Wn-rkcx3nClNm6By5bN5Pj119puOZCZ9bdBj7b9FQHeA3tb9crmKjygpInDf0HI0G8hkjrn_y3B7r8heDukmCY2HBLwOq9auO65MY799fHi_Z5Uvk8IkmKV8b5uYB0d_L2eWTnNxgjGAmVZOstOO6Vh3ERxQp0i2dFk5fNtGL4oNRJPVlenKyUNq6Hq9GxXLhkwWuM6qlTwkMvAH4aVNuEjiqNx3jVUCns_fSV55UPicI-bfw9soOYHYNi3yQ0m8ehieJpVHT0a1JfL4ltmf6lcjQGpUrYUf1VFTCS-Tob8GtXzqaMROmiLdzaVx6oj0cDpKh04gTVtCrjmtyCVl8Pe2uPJtZ4TweeJgN6jIhAay_clyYM69LsgIPzkBs7nxnOMqrikL3XvMcYMxQnIqKh7M5yBd7DMjRn4awVBQNgV5Fl_WirRkFgwnbzkEZTDIyJfNtuucPj798bAeazgQlrtMpc5lLPuCoP4E8Z8C-lfhrU8xIXBUZ2cV1FGsq_u53GyiOst1j9NSUqRnaWkr_yuVCRS3y5OfoklgVYl97HXoWwSP8",
      token:      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGE2NDZlMDc5NDA3MjNkMDk1NDQ5ZjRiNjNjNDc1ZGMyNzBlZTExNmEwN2Q0ZWFjNGNlYzY2ZGRiMmZmYzlhNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NjMwMTI2MCwiaWF0IjoxNjU2MjE0ODUwLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiZTdjYmE2YzEtYzdkYy00MTAxLTgyZmEtZDA2ZGIyNWNiOGI3Iiwic2lkIjoiMzVkYzZmODktMTlmZS00ZjRiLTlmZjUtNzliN2YxNjJkMzJhIn0.hYwr7ux1xkyef7-b2z9NFHHXssMxfqsdO0-ITXZyN8F7EUr_au8MTa2Bcz9OJnaKlXyRWyHXLtz9cLcMCXjDcJMUIWAzPbysgiTxq7t6Fd-7rX6iNDgk6yNLc8uZDTTpsbv1fy09R7n8fxzc8pkW7-hHe4YK0qErSKAmOt7-VtFW7qbFkd_Bw3Miw32wR3tGtHyJP6wXRo5HDE16nfELY7jxf-y-WbcC6SZ5xfgWupJoxNM9Pp3nGh1cXbd-1N9vn7TO3ILkVxn25XpJ3HHPrHa_hpm3DlQ8zMZRE_KbLMC-9Chj7pQGW0dI6OHP5vcfP6E8InVKv213WEAcEU_hbTsujsNYrEiTmimy4i6cKYFxcAkP8KKZ1nfwF-7nsZJ6Zn6TDfpZIxl6vtUpVL4CL3SOIsaCcG0Pkm8Hv2E5NMeaMLmj3Rlzm8hSkv5kPhY6TYPiVjE23zIfgkyZnwL59krVB3pu48ehIcea4coCmQ03SRgYwg0TMevZRPZ03ms2AyLtHpGl8hcK4biqqk6kNhmJPtvD7_iCR002M5Phe7E3UH4blXsCpCvGgr7Sl0Uf76gVZ9btenxfHneOeNpUajsyDnojHC4hQqESpS6678GFuJSUzka5IDF7yxnBpoFyBlpCyNhlPF5x3PQ7MYboU3dP4WmbRYe-OEQT8ruH6R8",
      initPhrase: "Открой Plan Up Dev",
      getState
    });
  }
  return createAssistant({ getState });
}

class App extends React.Component {

  constructor(props) {
    super(props);

    const assistant = initAssistant(() => this.getState);
    assistant.on("data", (data) => this.handleAssistantData(data));

    this.state = {
      tasks:            [],
      modalActive:      false,
      taskListHeadline: "Активные",
      sberUserId:       null,
      assistant: assistant 
    }
  }

  componentDidMount() {
    this.updateTaskList("Активные");
  }

  handleAssistantData({ action }) {
    console.log("App: handleAssistantData: action", action);

    if (action !== undefined) {
      this.dispatchAssistantAction(action);
    }
  }

  getState() {
    console.log("App: useEffect: getState: tasks:", this.state.tasks);
    // console.log("гет стейт вызван");
    // console.log("Задачи:", tasks);
    const state = {
      item_selector: {
        items: this.state.tasks.map(({ Task, title }, index) => {
          return {
            number: index + 1,
            id:     Task,
            title:  title
          }
        })
      }
    }
    return state;
  }

  assistantAuthentication(action) {
    this.setState({ sberUserId: action[ 'user_id' ] });
    this.updateTaskList("Активные", null, true);
  }

  assistantAddTask(action) {
    let pythonDate = null;
    let formData   = new FormData();

    if (action.date) {
      pythonDate = `${action.date.year}-${action.date.month}-${action.date.day}`;
      formData.append("completion_date", pythonDate);
    }

    formData.append("sber_user_id", this.state.sberUserId)
    formData.append("title", action.task_title);

    const url = `${BASE_URL}/api/tasks/`;
    fetch(url, {
      method: "POST",
      body:   formData
    })
    .then(response => {
      if (response.status !== 201)
        throw new Error();
      else 
        response.json()
    })
    .then(json => {
      console.log(`>>> POST ${url}: res:`, json)
      this.state.assistant.sendData({action: {action_id:"addSuccess", parameters: {task_title: action.task_title}}})
      this.updateTaskList("Активные");
    })
    .catch(error => {
      console.log("Hello")
      this.state.assistant.sendData({action: {action_id:"addError", parameters: {task_title: action.task_title}}})
    })
  }

  changeTaskState(taskText) {
    console.log("changeTaskState taskText: ", taskText)
    console.log("changeTaskState tasks: ", this.state.tasks)
    if (this.state.tasks.length > 0) {
      const neededTaskList = this.state.tasks.find((l) => {   
        
        const variable = l.tasks.filter(il => il.title.toLowerCase() == taskText.toLowerCase());

        if (variable && variable.length > 0) {
          return true;
        }
      })

      if (neededTaskList !== undefined) {
        const taskToUpdate = neededTaskList.tasks.filter(l => l.title.toLowerCase() == taskText.toLowerCase());

        let data  = {
          "completion": (taskToUpdate[0].completion ? false : true)
        }

        const url = `${BASE_URL}/api/tasks/${taskToUpdate[0].Task}/`;
        
        fetch(url, {
          method:  "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body:    JSON.stringify(data)
        })
          .then(response => response.json())
          .then(json => {
            console.log(`>>> PATCH ${url}: res:`, json)
            this.removeTaskFromList(this, neededTaskList.date, taskToUpdate[0].Task);
            this.state.assistant.sendData({action: {action_id: "taskCompletionSuccess", payload: {}}})
          })
          .catch(error => console.error(error));
      } else {
        this.state.assistant.sendData({action: {action_id: "taskCompletionFailed", payload: {}}})
      }
      console.log('changeTaskState: return tasks.length > 0:', this.state.tasks.length > 0);
    }
      
  }

  assistantCompleteTask(action) {
    if (action) {
      this.changeTaskState(action.task_title)
    }
  }

  assistantShowSchedule(action) {
    const currentDate = new Date();
    let dateArr = [];

    if (action.date) {
      const pythonDate = `${action.date.year}-${action.date.month}-${action.date.day}`;
      
      dateArr.push(pythonDate)
    } else {
      const currentWithOffset = new Date(currentDate.getTime() + 604800000);
      const startPythonDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDay()}`;
      const endPythonDate = `${currentWithOffset.getFullYear()}-${currentWithOffset.getMonth() + 1}-${currentWithOffset.getDay()}`;

      dateArr.push(startPythonDate, endPythonDate);
    }

    this.updateTaskList(
      this.state.taskListHeadline === "Активные" ? "Активные" : "Архив",
      dateArr
    )
  }

  dispatchAssistantAction(action) {
    if (action && action.type) {
      switch (action.type) {
        case "get_user_id":
          this.assistantAuthentication(action)
          break;

        case "add_task":
          this.assistantAddTask(action);
          break;
          
        case "complete_task":
          this.assistantCompleteTask(action);
          break;
        
        case "get_schedule":
          this.assistantShowSchedule(action);
          break;
        
        default:
          break;
      }
    }
  }

  updateTaskList(location = "Активные", dates = null, checkAuthentication = false) {
    let getUrlSuffix = "?"

    getUrlSuffix += `sber_user_id=${this.state.sberUserId}&`

    if (location === "Активные") {
      getUrlSuffix += "isCompleted=False"
    } else if (location === "Архив") {
      getUrlSuffix += "isCompleted=True"
    } else {
      getUrlSuffix += "";
    }

    if (dates !== null) {
      if (dates.length > 1) {
        getUrlSuffix += `&date_start_range=${dates[ 0 ]}&date_end_range=${dates[ 1 ]}`
      } else if (dates.length === 1) {
        getUrlSuffix += `&date=${dates[ 0 ]}`
      }
    }

    const url = `${BASE_URL}/api/formated_tasks/${getUrlSuffix}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(`>>> GET ${url}: res:`, json)
        this.setState({ tasks: json.tasks ? json.tasks : [] });

        if (checkAuthentication) {
          this.state.assistant.sendData({action: {action_id: "authenticationSuccessful", parameters: {task_amount: json.task_amount}}})
        }
        
        this.setState({ taskListHeadline: location });
      })
  }

  removeTaskFromList(AppJsx, taskDate, taskId) {
    if (AppJsx.state.tasks.length !== 0) {
      const newList         = structuredClone(AppJsx.state.tasks);
      const cleanedTaskList = AppJsx.state.tasks.find(el => el.date === taskDate).tasks.filter(el => el.Task !== taskId);
      const indToUpdate     = AppJsx.state.tasks.findIndex(el => el.date === taskDate);

      if (indToUpdate !== -1) {
        newList[ indToUpdate ].tasks = cleanedTaskList;
      } else {
        console.log("Not found")
      }

      AppJsx.setState({ tasks: newList });

    }
    console.log('App: tasks:', AppJsx.state.tasks)
  }

  render() {
    return (
      <div className='app-wrapper'>
        <Background_app/>
        <div className='app-content-wrapper'>
          <Navbar
            updateTaskList={(...values) => this.updateTaskList(...values)}
            setTaskListHeadline={value => this.setState({ taskListHeadline: value })}
            setModalActive={value => this.setState({ modalActive: value })}
          />
          <Tasks
            headline={this.state.taskListHeadline}
            taskList={this.state.tasks}
            removeTaskFromList={this.removeTaskFromList}
            AppJsx={this}
          />
          <Calendar_menu
            updateTaskList={(...values) => this.updateTaskList(...values)}
            taskListHeadline={this.state.taskListHeadline}
          />

        </div>
        {/*<Achievements/>
			<Profile/>*/}
        <Modal
          sberUserId={this.state.sberUserId}
          active={this.state.modalActive}
          setModalActive={value => this.setState({ modalActive: value })}
          updateTaskList={(...values) => this.updateTaskList(...values)}
        />
      </div>
    );
  }
}

export default App;
