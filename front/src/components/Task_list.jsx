import React from 'react'
import {TaskItem} from "./Task_list_item";

const Task_list = (props) => {
    return (
        <div className="Task_list">
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
        </div>
    );
}
export default Task_list;
