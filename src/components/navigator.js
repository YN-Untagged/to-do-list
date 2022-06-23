import React from 'react';
import {useNavigate} from 'react-router-dom'

function Navigator (){
    const navigate = useNavigate();

    const logout = (()=>{
        sessionStorage.clear();
        navigate('/login');
    });
    
    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Todo List</span>
                <button className='btn btn-danger' type='button' onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navigator;
