import React from 'react'
import './App.css';
import {Route} from "react-router-dom";
import Header from "./Components/Header";

const App = () => {
  return (
      <div className='app-wrapper'>
        <Header/>.
        <Navbar/>
          <div class='app-wrapper-content'>
              <Route component={Profile}/>
              <Route component={Tasks}/>
              <Route component={Achievements}/>
          </div>
      </div>
  )
}

export default App;