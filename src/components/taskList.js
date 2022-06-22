import React, {useState, useEffect} from 'react';
import Task from './task';
import storageHelpers from './localStorageExports';
import EditModal from './editModal';

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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [eTask , setETask] = useState();

    const handleEditClick = ((tsk)=>{
        setETask(tsk);
        handleShow();
    })

    

    return (
        <>
            <div className='container-fluid'>
                <form method='Post' onSubmit={addItem}>
                <div className='input-group mb-3 mt-3'>
                    <div className='form-floating'>
                        <input className='form-control' name='name' type='text' id='name' placeholder='Enter task' required />
                        <label for='name'>Task</label>
                    </div>
                    <div className='form-floating'>
                        <select className='form-control' name='priority' id='priority'>
                            <option value='Low'>Low</option>
                            <option value='Moderate'>Moderate</option>
                            <option value='High'>High</option>
                        </select>
                        <label for='priority'>Priority</label>
                    </div>
                    
                    <div className='form-floating'>
                        <input className='form-control' name='due' type='datetime-local' min={new Date().toISOString().slice(0, 16)} id='due' />
                        <label for='due'>Due Date</label>
                    </div>
                    
                    <button className='btn btn-success' type='submit'>Add</button>
                </div>
                    
                </form>
            </div>
            <div className='table-responsive'>
                <table className='table'>
                    {tasks === null || tasks === undefined ? (
                        <tr>You have no tasks</tr>
                    ):(
                        <>
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Due Date</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {tasks.map((task) => {
                                    return <Task key={task.id} task={task} edit={editTask} remove={removeTask} show={handleEditClick} />
                                })}
                            </tbody>  
                        </>  
                    )}
                </table>
            </div>
            
            <EditModal tsk={eTask} show={show} handleClose={handleClose} edit={editTask} />
        </>
    );
}

export default TaskList;
