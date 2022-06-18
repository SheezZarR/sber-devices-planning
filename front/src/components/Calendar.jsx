import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import '../Styles/Calendar.css'

function Calendar_menu() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        callAmbulance(); 
    }, [date])

    function callAmbulance(){
        let pythonDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        console.log(`${date}\n ${pythonDate}`);
    }

    return (
        <div className='cal_menu'>
            <div className='calendar-container'>
                <Calendar 
                onChange={(value, event) => {setDate(value)}} 
                defaultValue={date}
                locale="ru" 
                />
            </div>
        </div>
    );
}

export default Calendar_menu;