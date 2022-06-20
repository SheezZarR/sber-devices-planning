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
import {isConstructorDeclaration} from 'typescript';
import {act} from 'react-dom/test-utils';


//const BASE_URL = 'http://127.0.0.1:8001'
const BASE_URL = 'http://ocatano.eu.pythonanywhere.com'


const initAssistant = (getState) => {
  console.log('initAssistant')
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      //token:
      // "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGE2NDZlMDc5NDA3MjNkMDk1NDQ5ZjRiNjNjNDc1ZGMyNzBlZTExNmEwN2Q0ZWFjNGNlYzY2ZGRiMmZmYzlhNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NTgwNDQ2MywiaWF0IjoxNjU1NzE4MDUzLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiYWU5MmRlNjMtODY5My00MTM3LWE5ZmEtYTBjY2Y3YjQ1NTc0Iiwic2lkIjoiM2U3YzNiNDEtNjkxYy00MTk2LTg4MTYtOTExMzlmOThiYTFlIn0.UPatgNSCaDvmRvgsLcU5dB-Uvl9WVJkP-q9D_TMjTVc_mqbU_ZOU77QARDhJUMoce-6-JGf_Y_kRuNNYTnJFp0H0WFoMzm7zcwNFOwQzsFT-BiE-z6jzjrTfG0Wn-rkcx3nClNm6By5bN5Pj119puOZCZ9bdBj7b9FQHeA3tb9crmKjygpInDf0HI0G8hkjrn_y3B7r8heDukmCY2HBLwOq9auO65MY799fHi_Z5Uvk8IkmKV8b5uYB0d_L2eWTnNxgjGAmVZOstOO6Vh3ERxQp0i2dFk5fNtGL4oNRJPVlenKyUNq6Hq9GxXLhkwWuM6qlTwkMvAH4aVNuEjiqNx3jVUCns_fSV55UPicI-bfw9soOYHYNi3yQ0m8ehieJpVHT0a1JfL4ltmf6lcjQGpUrYUf1VFTCS-Tob8GtXzqaMROmiLdzaVx6oj0cDpKh04gTVtCrjmtyCVl8Pe2uPJtZ4TweeJgN6jIhAay_clyYM69LsgIPzkBs7nxnOMqrikL3XvMcYMxQnIqKh7M5yBd7DMjRn4awVBQNgV5Fl_WirRkFgwnbzkEZTDIyJfNtuucPj798bAeazgQlrtMpc5lLPuCoP4E8Z8C-lfhrU8xIXBUZ2cV1FGsq_u53GyiOst1j9NSUqRnaWkr_yuVCRS3y5OfoklgVYl97HXoWwSP8",
      token:      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDFhMGI5Yzc2Yjg5ZTE0YzI0MjhkYjNiMGI2MjBjMDMwYTVmMmQzMWFkNWExMjZjZTlhMGJhZDFhOTExY2E2NTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NTgzNjI1MiwiaWF0IjoxNjU1NzQ5ODQyLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiZDZhMmNlYmYtNTdjYy00NzM3LThmOTYtN2Q5YzRkZjJlODMzIiwic2lkIjoiNzQ4NWI5MDQtMDQwNy00MGYwLWIwMTctNDdjNjVlMWE1OGViIn0.P6jy_wKD_a9_Y6eRa4clsgzMXlwOXARP06k7KCGWde_lSPnlPqS8_7_PuyMbk6kgYr-Cj5C8hTDsqoyJz3-gYWf_5ADGdkkqQDmdC5u_AmXoM7vVrwlsb_pdM0ft_IX2Q2L4f0rR1Gzlyrnjpidezgc6uTYgvvp1LFznxD6mSmIIHAkHcE0A6grxv1ge5DTXORKBQNPosefZMcrmVKy-nhRsYJILYQQjcU7zNiKzo0zPDn81TFsc7KJ6MT5s5cSR0U1rCo8IF38vDwirUq2LuqUyKT7P_Fmm8m-U1W5f0BjjAmPF4ZEbO8Sy4gdfvo-F27JoS_I8t2hQVuOJwe7q2yId0A4I6rbOVeKxPs0HfSoIbYQDHkqbKMREyUXdAu83G72uahZ5t9XJi2AWfAYswskDCA0MWE2muViNkQuLMaUaNT05veEZEwb073glCx_nMxI9_FllsyyQg7UGsmDnraE4If4HMT1jN6KzbSHq56YBAFKmGc1culP9jqKI5yHB1Gq2VaPVl6EQTqqX-A4F-Iq80kBLZcCcQz-9nUPxX2id7BawY9aUX1Z7tcwbOc2jW-te3uwiMz43hl6t9jbxGPcd1OXG0revOx7oTeI7G5RVxriDCAu4S7XlmvPvQ3ZwU18VTC-o0mvjca0_IUMJ60M7OotgnLTyyMRwCPKY5OQ",
      initPhrase: "Открой Plan Up",
      getState
    });
  }
  return createAssistant({ getState });
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks:            [],
      modalActive:      false,
      taskListHeadline: "Активные",
      sberUserId:       null,
    }

    const assistant = initAssistant(() => this.getState);
    assistant.on("data", (data) => this.handleAssistantData(data));
  }

  componentDidMount() {
    this.updateTaskList("Активные");
  }

  handleAssistantData({ action }) {
    console.log("App: handleAssistantData: action", action);
    // console.log("Init action", action);
    if (action) {
      // console.log("Получил голосовую/текстовую комманду от ассистента")
      // console.log("Список задач у ассистента: ", tasks);
      this.dispatchAssistantAction(action);

      if (action && action.type === "get_user_id") {
        this.setState({ sberUserId: action[ 'user_id' ] });
      }
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


  assistantAddTask(assistantAction) {
    let pythonDate = null;
    let formData   = new FormData();

    if (assistantAction.date) {
      pythonDate = `${assistantAction.date.year}-${assistantAction.date.month}-${assistantAction.date.day}`;
      formData.append("completion_date", pythonDate);
    }

    formData.append("sber_user_id", this.state.sberUserId)
    formData.append("title", assistantAction.task_title);
    // formData.append("description", description);

    const url = `${BASE_URL}/api/tasks/`;
    fetch(url, {
      method: "POST",
      body:   formData
    })
      .then(response => response.json())
      .then(json => {
        console.log(`>>> POST ${url}: res:`, json)
        this.updateTaskList("Активные");
      })
      .catch(error => {
        console.error(error)
      })
  }


  changeTaskState(taskText) {
    console.log("changeTaskState taskText: ", taskText)
    console.log("changeTaskState tasks: ", this.state.tasks)
    if (this.state.tasks.length > 0) {
      const cleanTask = this.state.tasks.find((l) => {

        const variable = l.tasks.filter(il => il.title.toLowerCase() == taskText.toLowerCase());

        if (variable && variable.length > 0) {
          console.log('changeTaskState: return variable:', variable);
          return variable;
        }
      })

      let data  = {
        "completion": (cleanTask.tasks[ 0 ].completion ? false : true)
      }
      const url = `${BASE_URL}/api/tasks/${cleanTask.tasks[ 0 ].Task}/`;
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
          this.removeTaskFromList(cleanTask.date, cleanTask.tasks[ 0 ].Task);
        })
        .catch(error => console.error(error));
    }
    console.log('changeTaskState: return tasks.length > 0:', this.state.tasks.length > 0);
  }

  assistantCompleteTask(action) {
    if (action) {
      this.changeTaskState(action.task_title)
    }
  }

  dispatchAssistantAction(action) {
    if (action && action.type) {
      switch (action.type) {
        case "add_task":
          this.assistantAddTask(action);
          break;

        case "complete_task":
          this.assistantCompleteTask(action);
          break;

        default:
          break;
      }
    }
  }


  updateTaskList(location = "Активные", dates = null) {
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
        this.setState({ tasks: json });
        this.setState({ taskListHeadline: location });
      })
  }

  removeTaskFromList(taskDate, taskId) {
    if (this.state.tasks.length !== 0) {
      const newList         = structuredClone(this.state.tasks);
      const cleanedTaskList = this.state.tasks.find(el => el.date === taskDate).tasks.filter(el => el.Task !== taskId);
      const indToUpdate     = this.state.tasks.findIndex(el => el.date === taskDate);

      if (indToUpdate !== -1) {
        newList[ indToUpdate ].tasks = cleanedTaskList;
      } else {
        console.log("Not found")
      }

      this.setState({ tasks: newList });

    }
    console.log('App: tasks:', this.state.tasks)
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
