import React from 'react'
import Tasks_lists from "./Components/Tasks_lists";

const app = () => {
    return(
        <navbar className='nav'>
            <div>
                <a href='#s'>Profile</a> -
                <a href='#s'>Tasks</a> -
                <a href='#s'>Achievements</a> -
            </div>
            <Tasks_lists />
        </navbar>
    )
}
export default Navbar;