import React, { useEffect, useState } from 'react'
import Task_menu from "../components/Task_menu";
import { H2 } from '@salutejs/plasma-typo'
import App from '../App';

const Tasks = (props) => {
    const {headline, taskList, removeTaskFromList, AppJsx} = props;

    return (
        <div className="tasks-wrapper">
           <H2>{headline}</H2> 
            <Task_menu 
                removeTaskFromList={removeTaskFromList}
                taskListTitle={headline}
                taskList={taskList}
                AppJsx={AppJsx}
            />
        </div>
    )
}
export default Tasks;

