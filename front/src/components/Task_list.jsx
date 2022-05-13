import React,{ useState } from 'react'
import {TaskItem} from "./Task_list_item";
import '../Styles/Task_list_item.css'

const Task_list = (props) => {
    const[task_items, set_task_items] = useState([
        {id: 1, text: 'Manacrypt'},
        {id: 2, text: 'Manacrypt'},
        {id: 3, text: 'Manacrypt'},
        {id: 4, text: 'Manacrypt'},
    ])
    return (
        <div className="Task_list">

            {task_items.map(task_item =>
                <TaskItem task_item={task_item} key={task_item.id}/>
            )}
        </div>
    );
}

export default Task_list;