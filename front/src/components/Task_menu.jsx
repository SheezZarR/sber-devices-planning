import React,{ useState } from 'react'
import{Task_list} from "./Task_list"
import "../Styles/TaskMenu.css"

/*scrollIntoView({ behavior: 'smooth' })*/

const Task_menu = (props) => {

    const {taskList, taskListTitle, removeTaskFromList, AppJsx} = props;
    
    return (
        <div className="Task_Menu">
            {taskList.map((task) =>
                <Task_list 
                    key={task.date + taskListTitle} 
                    date={task.date} 
                    tasks={task.tasks} 
                    removeTaskFromList={removeTaskFromList}
                    AppJsx={AppJsx}
                />
            )}
        </div>
    );
}

export default Task_menu;