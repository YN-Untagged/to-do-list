import React from 'react';
import {useNavigate} from 'react-router-dom'

function Navigator (){
    const navigate = useNavigate();

    const logout = (()=>{
        sessionStorage.clear();
        navigate('/login');
    });
    
    return (
        <nav>
            <button type='button' onClick={logout}>Logout</button>
        </nav>
    );
}

export default Navigator;
