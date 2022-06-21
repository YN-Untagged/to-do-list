import React, {useState, useEffect} from 'react';
import Task from './task';
import storageHelpers from './localStorageExports';

const {v4 : uuidv4} = require("uuid")


function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const userTasks = storageHelpers.getUserTasks();
        
        setTasks(userTasks);

    }, []);

    useEffect(() => {
        const users = storageHelpers.getUsers(),
        indx = storageHelpers.getIndex();
        users[indx].tasks = tasks;
        storageHelpers.storeUsers(users);

    }, [tasks]);

    const addItem = ((event) => {
        event.preventDefault();

        const form = event.target;

        const task = {
            id : uuidv4(),
            name : form.name.value,
            priority: form.priority.value,
            due: form.due.value,
            date: Date.now(),
            complete: false
        };

        form.reset();
        setTasks(prevTasks => {
            return [...prevTasks, task];
        });
    });

    const editTask = (()=> {
        const newTasks = [...tasks];

        setTasks(newTasks);
    });

    const removeTask = ((id)=>{
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    });

    return (
        <>
            <div>
                <form method='Post' onSubmit={addItem}>
                <div className='input-group'>
                    <div class='form-floating mb-3 mt-3'>
                        <input className='form-control' name='name' type='text' id='name' placeholder='Enter task' required />
                        <label for='name'>Task</label>
                    </div>
                    <div class='form-floating mb-3 mt-3'>
                        <select className='form-control' name='priority' id='priority'>
                            <option value='Low'>Low</option>
                            <option value='Moderate'>Moderate</option>
                            <option value='High'>High</option>
                        </select>
                        <label for='priority'>Priority</label>
                    </div>
                    
                    <div class='form-floating mb-3 mt-3'>
                        <input className='form-control' name='due' type='datetime-local' min={new Date().toISOString().slice(0, 16)} id='due' />
                        <label for='due'>Due Date</label>
                    </div>
                    
                    <button className='btn btn-success' type='submit'>Add</button>
                </div>
                    
                </form>
            </div>
            <div>
                <ul className='list-group list-group-flush d-flex flex-column'>
                    {
                        tasks.map((task) => {
                            return <Task key={task.id} task={task} edit={editTask} remove={removeTask} />
                        })
                    }
                </ul>
            </div>
            
            
        </>
    );
}

export default TaskList;
