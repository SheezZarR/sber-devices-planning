import React,{ useState } from 'react'
import {TaskItem} from "./Task_list_item";
import '../Styles/Task_list.css'

export const Task_list = (props) => {
    const {date, tasks} = props

    const [tasksList, setTasks] = useState(() => {
        return tasks;
    });
    

    return (
        <div className="Tasklist">
            <div className="Tasklist_date">
                <strong>{date}</strong>
            </div>
            {
                tasksList.map((taskItem) => (
                    <TaskItem
                        id={taskItem.Task}
                        text={taskItem.title}
                    />
                ))
            }
        </div>
    );
}
