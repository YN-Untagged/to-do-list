import React, {useState, useEffect} from 'react';
import Task from './task';
import storageHelpers from './localStorageExports';
import EditModal from './editModal';
import AddTask from './addTask';
import '../../node_modules/bootstrap/js/src/tab';
import swal from 'sweetalert';

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

    const addItem = ((task) => {
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

    const deleteTasks = ((event)=> {
        const btn = event.target.name;
        let newTasks ;

        swal({
            title: "Delete " + btn +" tasks?",
            text: "Once deleted, you will not be able to recover deleted tasks.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((deleteTasks) => {
            if (deleteTasks) {
                if(btn === "all"){
                    newTasks = [];
                }
                else if(btn === "completed"){
                    newTasks = tasks.filter(task => !task.complete);
                }
                else if(btn === "incomplete"){
                    newTasks = tasks.filter(task => task.complete);
                }

                setTasks(newTasks);
            } 
        });
        
    })

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
            <AddTask addItem={addItem}/>
            <div className='container-fluid'>
                <h1>Tasks</h1>
                {tasks === null || tasks === undefined || tasks.length === 0 ? (
                    <h4>You have no tasks</h4>
                )
                :(
                    <>
                        <ul className='nav nav-tabs' role='tablist'>
                            <li className='nav-item'>
                                <a className='nav-link active' data-bs-toggle='tab' href='#all'>All</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle='tab' href='#todo'>Incomplete</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' data-bs-toggle='tab' href='#complete'>Complete</a>
                            </li>
                            <div className=' col d-flex justify-content-end'>
                                <button className='btn btn-outline-info' name='incomplete' onClick={deleteTasks} >Clear Incomplete</button>
                                <button className='btn btn-outline-warning' name='completed' onClick={deleteTasks} >Clear Complete</button>
                                <button className= 'btn btn-outline-danger' name='all' onClick={deleteTasks} >Clear All</button>
                            </div>
                        </ul>
                        <div className='tab-content'>
                            <div id='all' className='container-fluid tab-pane active'>
                                <div className='table-responsive'>
                                    <table className='table'>
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
                                    </table>
                                </div>
                            </div>
                            <div id='todo' className='container-fluid tab-pane fade'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        {(tasks.filter(task => !task.complete)).length === 0 ? (
                                            <h4>You have no tasks</h4>
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
                                                    {(tasks.filter(task => !task.complete)).map((task) => {
                                                        return <Task key={task.id} task={task} edit={editTask} remove={removeTask} show={handleEditClick} />
                                                    })}
                                                </tbody>  
                                            </>  
                                        )}
                                    </table>
                                </div>
                            </div>
                            <div id='complete' className='container-fluid tab-pane fade'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        {(tasks.filter(task => task.complete)).length === 0 ? (
                                            <tr><h4>You have no tasks</h4></tr>
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
                                                    {(tasks.filter(task => task.complete)).map((task) => {
                                                        return <Task key={task.id} task={task} edit={editTask} remove={removeTask} show={handleEditClick} />
                                                    })}
                                                </tbody>  
                                            </>  
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            
            <EditModal tsk={eTask} show={show} handleClose={handleClose} edit={editTask} />
        </>
    );
}

export default TaskList;

<>
    
</>