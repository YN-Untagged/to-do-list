import React from 'react';
import {useNavigate} from 'react-router-dom'

function Navigator (){
    const navigate = useNavigate();

    const logout = (()=>{
        sessionStorage.clear();
        navigate('/login');
    });
    
    return (
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container-fluid">
                <span class="navbar-brand">Todo List</span>
                <button class="btn btn-danger" type="button" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navigator;
