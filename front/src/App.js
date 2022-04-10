import React from 'react'
import './App.css';
import {Route} from "react-router-dom";
import Header from "./Components/Header";
import Profile from './Components/Profile'
import Tasks from './Components/Tasks'
import Achievements from './Components/Achievements'

const App = () => {
  return (
      <div className='app-wrapper'>
        <Header/>
          <div class='app-wrapper-content'>
              <Route component={Profile}/>
              <Route component={Tasks}/>
              <Route component={Achievements}/>
          </div>
      </div>
  )
}

export default App;