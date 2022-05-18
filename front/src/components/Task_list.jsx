import React,{ useState } from 'react'
import {TaskItem} from "./Task_list_item";
import '../Styles/Task_list.css'

export const Task_list = (props) => {
    const{date, tasks} = props

    return (
        <div className="Tasklist">
            <div className="Tasklist_date">
                <strong>{date}</strong>
            </div>
            {
                tasks.map((Task_Item) => (
                    <TaskItem
                        id={Task_Item.id}
                        text={Task_Item.text}
                    />
                ))
            }
        </div>
    );
}
