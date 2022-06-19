import React, { useEffect, useState } from 'react'
import Task_menu from "../components/Task_menu";
import { H2 } from '@salutejs/plasma-typo'

const Tasks = (props) => {
    const {headline, taskList, removeTaskFromList} = props;

    return (
        <div className="tasks-wrapper">
           <H2>{headline}</H2> 
            <Task_menu 
                removeTaskFromList={removeTaskFromList}
                taskListTitle={headline}
                taskList={taskList}
            />
        </div>
    )
}
export default Tasks;

