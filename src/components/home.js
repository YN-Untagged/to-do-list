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
            <>
                <Navigator/>
                <div className='container-fluid page'>
                    <TaskList />
                </div>
            </>
        )
        
    );
}

export default Home;