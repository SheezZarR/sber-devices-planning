import { Button, Checkbox, Headline3, Headline4 } from "@salutejs/plasma-ui";
import React, {
    useEffect, 
    useRef,
    useState
} from "react";
import { P1, H1, DatePicker, TextArea, TextField } from "@salutejs/plasma-ui";
import { colorValues } from "@salutejs/plasma-tokens";

import "../Styles/Modal.css"

// const BASE_URL = 'http://ocatano.eu.pythonanywhere.com'
const BASE_URL = 'http://127.0.0.1:8001'
// 
function addTask(sberUserId, title, description, date, updateTaskListFunc) {
    let pythonDate = null;
    let formData = new FormData();

    if (date){
        pythonDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        formData.append("completion_date", pythonDate);
    }

    formData.append("sber_user_id", sberUserId)
    formData.append("title", title);
    formData.append("description", description);
    

    fetch(`${BASE_URL}/api/tasks/`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(json => {
        console.log("Обновляю список задач, после добавления через UI");
        updateTaskListFunc("Активные");
    })
    .catch(error => {console.error(error)})
}


const Modal = (props) => {
    const {active, setModalActive, sberUserId, updateTaskList, taskListHeadline} = props;
    
    const [taskTitle, setTaskTitle] = useState(null);
    const [taskDescription, setTaskDescription] = useState(null);
    const [taskDate, setTaskDate] = useState(new Date());
    const [displayDatePicker, setDisplayDatePicker] = useState(true);

    const handleDateUpdate = (value) => {
        setTaskDate(value);
    }

    const modal_colors = {
        backgroundColor: colorValues.dark02
    }

    useEffect(() => {
        console.log(taskDate);
    }, [taskDate])

    function handleModalSubmit(event) {
        setModalActive(false); 
        
        addTask(
            sberUserId, 
            taskTitle, 
            taskDescription, 
            displayDatePicker ? taskDate : null, 
            updateTaskList
            );
    }

    function getModalForm() {
        return <>
            <div className="modal-headline">
                <Headline3>Добавление задачи</Headline3>
                <P1>Введите данные</P1>
            </div>
            <TextField 
                label="Название задачи"
                onChange={e => setTaskTitle(e.target.value)}
            ></TextField>
            <TextArea
                label="Комментарии к задаче"
                onChange={e => setTaskDescription(e.target.value)}
            ></TextArea>
            <Checkbox
                label="Добавить дату"
                defaultChecked={displayDatePicker}
                onChange={(e) => {setDisplayDatePicker(displayDatePicker ? false : true)}}
            />
            <DatePicker
                min={new Date(2022, 0, 0, 0, 0, 0)}
                max={new Date(2025, 0, 0, 0, 0, 0)}
                value={taskDate}
                onChange={handleDateUpdate}
                style={{
                    display: displayDatePicker ? "flex" : "none"
                }}
            ></DatePicker>
            <div className="controls">
                <Button text="Закрыть" view="clear" onClick={() => setModalActive(false)} size="s"></Button>
                <Button text="Добавить" view="success" size="s" onClick={e => handleModalSubmit(e)}></Button>
            </div>
        </>
    }

    function getModalHelp() {
        return <>
            <div className="modal-headline">
                <Headline3>Путеводитель по приложению</Headline3>
                <P1>Справка</P1>
            </div>
            <ul className="modal-help-list">
                <li>Иконка с <strong>домом</strong> - активные задачи</li>
                <li>Иконка с <strong>карточками</strong> - архив задач</li>
                <li>Иконка с <strong>плюсом в кружке</strong> - форма добавления задачи</li>
                <li><strong>Добавление</strong> задачи:"Добавь задачу..." и текст задачи, опционально дата задачи. Вы можете нажать на иконку с плюсом в кружочке для формы добавления</li>
                <li><strong>Завершение</strong> задачи:"Заверши задачу..." и текст задачи, или вы можете нажать на полый квадрат рядом с задачей</li>
                <li><strong>Возвращение</strong> задачи: "Верни задачу..." и текст задачи, или вы можете перейти в архив (иконка с карточками) и нажать на квадрат</li>
                <li><strong>Календарь</strong> для выделение временного промежутка. После выделения получится новый список</li>
                <li><strong>Расписание</strong> на неделю: "Покажи расписание"</li>
            </ul>
        </>
    }

    function getModalContent() {
        switch (props.modalContent) {
            case "Форма":
                return getModalForm();
                break;

            case "Справка":
                return getModalHelp();
                break;
            
            default:
                return null;
        }
    }

    return (
        <div className={active ? 'modal modal-active' : 'modal'} onClick={() => setModalActive(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={modal_colors}>
            { 
                getModalContent()  
            }   
            </div>
        </div>
    )
}

export default Modal;