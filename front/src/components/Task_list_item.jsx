import React from "react";
import {Checkbox} from "@salutejs/plasma-ui";

export const TaskItem = (props) => {
    return(
        <div className="task_item">
            <div className="task_item_content">
                <Checkbox label={props.task_item.text} id={props.task_item.id} defaultChecked />
            </div>
        </div>
    )
}

