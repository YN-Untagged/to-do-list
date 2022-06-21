import React from 'react';
import swal from 'sweetalert';

function Task ({task, edit, remove}) {
    const handleChange = (()=>{
        const opp = !task.complete;
        task.complete = opp;
        edit(task);
    });

    const handleRemoveClick = (()=>{
        swal({
            title: "Delete task?",
            text: "Once deleted, you will not be able to recover this task.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((deleteTask) => {
            if (deleteTask) {
                remove(task.id);
            } 
        });
        
    });

    const handleEditClick = (() => {

    })
    
    return (
        <li className='list-group-item d-flex justify-content-between'>
            <label>
                <input type='checkbox' checked={task.complete} onChange={handleChange}/>
                {task.name}
            </label>
            <span>{task.priority}</span>
            <div>
                <button type='button' className='btn btn-primary' onClick={handleEditClick}><i className='fas fa-pencil-alt'></i></button>
                <button type='button' className='btn btn-danger' onClick={handleRemoveClick}><i className='fas fa-trash'></i></button>
            </div>
            
        </li>
    );
}

export default Task;
