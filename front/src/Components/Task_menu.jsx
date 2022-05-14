import React,{ useState } from 'react'
import {Task_list} from "./Task_list";

const Task_menu = (props) => {
    const[task_lists, set_task_lists] = useState([

    ])
    return (
        <div className="Task_Menu">
            {task_lists.map(Task_list =>
                <Task_list Task_list={Task_list} key={Task_list.id}/>
            )}
        </div>
    );
}

export default Task_menu;