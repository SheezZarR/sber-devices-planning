import { Button, Headline3 } from "@salutejs/plasma-ui";
import React, {
    useEffect, 
    useRef,
    useState
} from "react";

import { P1, DatePicker, TextArea, TextField } from "@salutejs/plasma-ui";
import { colorValues } from "@salutejs/plasma-tokens";

import "../Styles/Modal.css"

function gatherForm(sberUserId, title, description, date) {
    let formData = new FormData();
    formData.append("sber_user_id", sberUserId)
    formData.append("title", title);
    formData.append("description", description);
    formData.append("completion date", date);

    fetch(`http://127.0.0.1:8001/api/tasks/`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => {console.error(error)})
}

const Modal = (props) => {
    const {active, setModalActive, sberUserId} = props;
    
    const [taskTitle, setTaskTitle] = useState(null);
    const [taskDescription, setTaskDescription] = useState(null);
    const [taskDate, setTaskDate] = useState(null);

    const modal_colors = {
        backgroundColor: colorValues.dark02
    }

    return (
        <div className={active ? 'modal modal-active' : 'modal'} onClick={() => setModalActive(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={modal_colors}>
                <div className="modalHeadline">
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
                <DatePicker
                    min={new Date(2022, 0, 0, 0, 0, 0)}
                    max={new Date(2025, 0, 0, 0, 0, 0)}
                    value={new Date()}
                    onChange={value => {setTaskDate(value)}}
                ></DatePicker>
                <div className="controls">
                    <Button text="Закрыть" view="clear" onClick={() => setModalActive(false)} size="s"></Button>
                    <Button text="Добавить" view="success" size="s" onClick={e => gatherForm(sberUserId, taskTitle, taskDescription, taskDate)}></Button>
                </div>
            </div>
        </div>
    )
}

export default Modal;