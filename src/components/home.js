import React from 'react';
import Navigator from './navigator';
import TaskList from './taskList';
import Login from './login';

function Home (){
    
    return (
        sessionStorage.getItem('user') === null ? (
            <Login/>
        ) 
        : (
            <div className='container-fluid page'>
                <div className='side_nav'>
                    <Navigator/>
                </div>
                
                <div className='main_container'>
                    <TaskList />
                </div>
            </div>
        )
        
    );
}

export default Home;