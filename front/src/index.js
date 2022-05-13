import React from "react";
import ReactDOM from "react-dom";
import { DeviceThemeProvider } from '@salutejs/plasma-ui';

import  App from './App';
import "./style.css";


ReactDOM.render(
    <DeviceThemeProvider responsiveTypo>
        <App />
    </DeviceThemeProvider>,
    document.getElementById("root")
);

