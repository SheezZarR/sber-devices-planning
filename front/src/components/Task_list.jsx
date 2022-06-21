import React,{ useState } from 'react'
import {TaskItem} from "./Task_list_item";
import '../Styles/Task_list.css'
import { useEffect } from 'react';
import { useRef } from 'react';

export const Task_list = (props) => {
    const {date, tasks, removeTaskFromList, AppJsx} = props

    return (
        <div className="Tasklist">
            <div className="Tasklist_date">
                <strong>{date}</strong>
            </div>
            {
                tasks.map((taskItem) => (
                    <TaskItem
                        key={taskItem.title + taskItem.Task.toString()}
                        id={taskItem.Task}
                        text={taskItem.title}
                        date={date}
                        completed={taskItem.completion}
                        removeTaskFromList={removeTaskFromList}
                        AppJsx={AppJsx}
                    />
                ))
            }
        </div>
    );
}
