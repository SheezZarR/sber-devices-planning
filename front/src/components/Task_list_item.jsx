import React, {
    useState,
    useEffect,
    useRef
} from "react";
import {Checkbox} from "@salutejs/plasma-ui";

import '../Styles/Task_list_item.css'

const BASE_URL = 'http://127.0.0.1:8001'

export const TaskItem = (props) => {
    const {id, text, date, completed, removeTaskFromList} = props;
    
    const taskRef = useRef();
    const taskId = useRef(id);
    const taskText = useRef(text);
    const taskDate = useRef(date);
    const [isCompleted, setIsCompleted ] = useState(completed);
    const isCompletedRef = useRef(completed);

    useEffect(() => {
        if (isCompleted != isCompletedRef.current) {
            console.log("Task complete");
            isCompletedRef.current = isCompleted;
            completeTask();
        } 
        
    }, [isCompleted])

    function completeTask() {
        let data = {
            "completion": isCompleted
        }
        
        fetch(`${BASE_URL}/api/tasks/${taskId.current}/`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            removeTaskFromList(taskDate.current, taskId.current);
        })
        .catch(error => console.error(error));
    }

    return(
        <div ref={taskRef} className={isCompleted ? "task-item task-item-isCompleted" : "task-item"}>
            <div className="task_item_content">
                <Checkbox
                    label={taskText.current}
                    id={taskId.current}
                    date={taskDate.current}
                    defaultChecked={isCompleted}
                    onChange={(e) => {setIsCompleted(isCompleted ? false : true )}}
                />
            </div>
        </div>
    )
}

