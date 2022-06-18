import React, {
    useState,
    useEffect,
    useRef
} from "react";
import {Checkbox} from "@salutejs/plasma-ui";

import '../Styles/Task_list_item.css'

export const TaskItem = (props) => {
    const {id, text, completed} = props;
    
    const taskId = useRef(id);
    const taskText = useRef(text);
    const [isCompleted, setIsCompleted ] = useState(completed);
    const isCompletedRef = useRef(completed)

    useEffect(() => {
        if (isCompleted != isCompletedRef.current) {
            console.log("Task")
            isCompletedRef.current = isCompleted;
            completeTask();
        } 
        
    }, [isCompleted])

    function completeTask() {
        let data = {
            "completion": isCompleted
        }
        
        fetch(`http://127.0.0.1:8001/api/tasks/${taskId.current}/`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {})
        .catch(error => console.error(error));
    }

    return(
        <div className={isCompleted ? "task-item task-item-isCompleted" : "task-item"}>
            <div className="task_item_content">
                <Checkbox
                    label={taskText.current}
                    id={taskId.current}
                    defaultChecked={isCompleted}
                    onChange={(e) => {setIsCompleted(isCompleted ? false : true )}}
                />
            </div>
        </div>
    )
}

