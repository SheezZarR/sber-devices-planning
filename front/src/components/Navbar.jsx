import React, { Component, useState } from 'react';
import { Button } from '@salutejs/plasma-ui';
import { 
    IconSettings, 
    IconStarFill, 
    IconCardstack,
    IconPlusCircle,
    IconHouse,
    IconHelp
} from '@salutejs/plasma-icons';
import history from './../history';

import "../Styles/Navbar.css";

const Navbar = (props) => {
    const {updateTaskList, setModalActive, setTaskListHeadline} = props

    return (
        <div className='nav-wrapper'>
            <div className='nav'>
                <Button 
                    size="m" 
                    contentLeft={<IconHouse color="green"/>} 
                    view="clear"
                    onClick={() => {updateTaskList("Активные")}}
                />
                <Button 
                    size="m" 
                    contentLeft={<IconCardstack color="green"/>} 
                    view="clear"
                    onClick={() => {updateTaskList("Архив")}}
                />
                    {/*<Button size="m" contentLeft={<IconStarFill color="yellow"/>} view="clear"*/}
                {/*        onClick={() => history.push('/Achievements')}/>*/}
                {/*<Button size="m" contentLeft={<IconSettings/>} view="clear" onClick={() => history.push('/Profile')}/>*/}
                <Button
                    size="m"
                    contentLeft={<IconPlusCircle/>}
                    onClick={() => setModalActive(true)}
                    view="clear"
                />
                <Button 
                    size="m"
                    contentLeft={<IconHelp/>}
                    onClick={() => {}}
                    view="clear"
                />
            </div>
        </div>
        
    );

}

export default Navbar;