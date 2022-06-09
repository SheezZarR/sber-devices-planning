import React,{ useState } from 'react'
import{Task_list} from "./Task_list"
import "../Styles/TaskMenu.css"

/*scrollIntoView({ behavior: 'smooth' })*/

const Task_menu = (props) => {

    const {taskList} = props
    
    return (
        <div className="Task_Menu">
            {taskList.map((task) =>
                <Task_list date={task.date} tasks={task.tasks}/>
            )}
        </div>
    );
}

export default Task_menu;