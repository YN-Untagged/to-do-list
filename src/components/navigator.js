import React from 'react';

function Navigator (){
    const logout = (()=>{
        alert('Logout clicked');
    })
    return (
        <nav>
            <button type='button' onClick={logout}>Logout</button>
        </nav>
    );
}

export default Navigator;
