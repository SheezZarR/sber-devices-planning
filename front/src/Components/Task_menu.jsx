import React,{ useState } from 'react'
import{Task_list} from "./Task_list"

/*scrollIntoView({ behavior: 'smooth' })*/

const Task_menu = (props) => {
    let task_arr = [
        {date: "14/5/2022", tasks: [
            {id: 1, text: 'Egg'},
            {id: 2, text: 'Manacrypt'},
            {id: 3, text: 'Lava'},
            {id: 4, text: 'Crane'},
        ]},
        {date: "16/5/2022", tasks:[
            {id: 5, text: 'Bitcoin'},
            {id: 6, text: 'Buy a car'},
            {id: 7, text: 'Ponder'},
            {id: 8, text: 'Man'},
        ]},
    ]
    return (
        <div className="Task_Menu">
            {task_arr.map((Tasklist) =>
                <Task_list date={Tasklist.date} tasks={Tasklist.tasks}/>
            )}
        </div>
    );
}

export default Task_menu;