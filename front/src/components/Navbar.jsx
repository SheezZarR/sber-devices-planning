import React, { Component, useState } from 'react';
import { Button } from '@salutejs/plasma-ui';
import { 
    IconSettings, 
    IconStarFill, 
    IconEvent,
    IconPlusCircle 
} from '@salutejs/plasma-icons';
import history from './../history';

import "../Styles/Navbar.css";

const Navbar = (props) => {
    const {updateTaskList, setModalActive} = props

    return (
        <div className='nav-wrapper'>
            <div className='nav'>
                <Button size="m" contentLeft={<IconEvent color="green"/>} view="clear"
                        onClick={() => history.push('/Tasks')}/>
                <Button size="m" contentLeft={<IconStarFill color="yellow"/>} view="clear"
                        onClick={() => history.push('/Achievements')}/>
                <Button size="m" contentLeft={<IconSettings/>} view="clear" onClick={() => history.push('/Profile')}/>
                <Button 
                    size="m" 
                    contentLeft={<IconPlusCircle/>} 
                    onClick={() => setModalActive(true)}
                    view="clear"></Button>
            </div>
        </div>
        
    );

}

export default Navbar;