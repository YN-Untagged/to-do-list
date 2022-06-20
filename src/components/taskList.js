import React, {useState, useEffect} from 'react';
import Task from './task';
import storageHelpers from './localStorageExports';

const {v4 : uuidv4} = require("uuid")


function TaskList() {
    const [tasks, setTasks] = useState([]);
    console.log(storageHelpers.getIndex());

    useEffect(() => {
        const userTasks = storageHelpers.getUserTasks();
        setTasks(userTasks);
        console.log(userTasks);
    }, []);

    useEffect(() => {
        const users = storageHelpers.getUsers(),
        indx = storageHelpers.getIndex();
        users[indx].tasks = tasks;
        console.log(users);
        //storageHelpers.storeUsers(users);

    }, [tasks]);

    const addItem = ((event) => {
        event.preventDefault();

        const form = event.target;

        const task = {
            id : uuidv4(),
            name : form.name.value,
            priority: form.priority.value,
            date: Date.now(),
            complete: false
        };

        form.reset();
        setTasks(prevTasks => {
            return [...prevTasks, task]
        });
    });

    return (
        <>
            <div>
                {
                    tasks.map((task) => {
                        return <Task key={task.id} task={task}/>
                    })
                }
            </div>
            <div>
                <form method='Post' onSubmit={addItem}>
                    <input name='name' type='text' required/>
                    <select name='priority'>
                        <option value='Low'>Low</option>
                        <option value='Moderate'>Moderate</option>
                        <option value='High'>High</option>
                    </select>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </>
    );
}

export default TaskList;
