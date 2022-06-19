import { IconRefresh } from '@salutejs/plasma-icons';
import { Button } from '@salutejs/plasma-ui';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Calendar from 'react-calendar';

import '../Styles/Calendar.css'

function Calendar_menu(props) {
    const {updateTaskList, taskListHeadline} = props;
    const [dateLeftmost, setDateLeftmost] = useState(new Date());
    const [dateRightmost, setDateRightmost] = useState(new Date());
    const didInteract = useRef(false);
    const reactCalendarRef = useRef();

    useEffect(() => {
        let pythonDateRightmost = `${dateLeftmost.getFullYear()}-${dateLeftmost.getMonth() + 1}-${dateLeftmost.getDate()}`;
        let pythonDateLeftmost = `${dateRightmost.getFullYear()}-${dateRightmost.getMonth() + 1}-${dateRightmost.getDate()}`;
        let location = taskListHeadline
        
        if (didInteract.current !== false) {
            if (pythonDateLeftmost !== pythonDateRightmost) {
                
                updateTaskList(taskListHeadline, [pythonDateLeftmost, pythonDateRightmost])
            } else {
                console.log(pythonDateLeftmost);
                updateTaskList(taskListHeadline, [pythonDateLeftmost]);
            }
        }
        
    }, [dateLeftmost, dateRightmost])

    return (
        <div className='cal_menu'>
            <div className='calendar-container'>
                <Calendar 
                    ref={reactCalendarRef}
                    onChange={(value, event) => {setDateLeftmost(value[1]); setDateRightmost(value[0]); didInteract.current = true}} 
                    selectRange={true}
                    locale="ru" 
                />
                {/* <Button
                    className='reset-date-button'
                    text="Сбросить дату"
                    contentLeft={<IconRefresh size="xs"/>}
                    onClick={() => {setDateLeftmost(new Date()); setDateRightmost(new Date())}}
                ></Button> */}
            </div>
        </div>
    );
}

export default Calendar_menu;