import React, { Component } from 'react';
import { Button } from '@salutejs/plasma-ui';
import { IconSettings } from '@salutejs/plasma-icons';
import { IconStarFill } from '@salutejs/plasma-icons';
import { IconEvent} from '@salutejs/plasma-icons';
import history from './../history';

import s from "../Styles/Navbar.module.css";

export default class Navbar extends Component {
    render() {
        return (
            <div className={s.nav}>
                <Button size="m" contentLeft={<IconEvent color="green"/>} view="clear"
                        onClick={() => history.push('/Tasks')}/>
                <Button size="m" contentLeft={<IconStarFill color="yellow"/>} view="clear"
                        onClick={() => history.push('/Achievements')}/>
                <Button size="m" contentLeft={<IconSettings/>} view="clear" onClick={() => history.push('/Profile')}/>
            </div>
        );
    }
}