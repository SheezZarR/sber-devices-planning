import React, { useState } from 'react';
import Calendar from 'react-calendar';

import '../Styles/Calendar.css'

function Calendar_menu() {
    const [date, setDate] = useState(new Date());

    return (
        <div className='cal_menu'>
            <div className='calendar-container'>
                <Calendar 
                onChange={setDate} 
                value={date}
                locale="ru" 
                />
            </div>
        </div>
    );
}

export default Calendar_menu;