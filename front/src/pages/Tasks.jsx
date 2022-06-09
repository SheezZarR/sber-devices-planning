import React, { useEffect, useState } from 'react'
import Task_menu from "../components/Task_menu";


const Tasks = (props) => {
    const {taskList} = props;

    return (
        <div className="tasks-wrapper">
            <Task_menu 
                taskList={taskList}
            />
        </div>
    )
}
export default Tasks;

