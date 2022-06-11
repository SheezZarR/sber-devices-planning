import React from "react";
import {Checkbox} from "@salutejs/plasma-ui";

import '../Styles/Task_list_item.css'

export const TaskItem = (props) => {
    const{id, text} = props
    
    console.log(id, text);
    return(
        <div className="task_item">
            <div className="task_item_content">
                <Checkbox
                    label={text}
                    id={id}
                    defaultChecked={false}
                />
            </div>
        </div>
    )
}

