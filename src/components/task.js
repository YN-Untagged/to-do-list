import React from 'react';

function Task ({task}) {
    return (
        <div>
            <label>
                <input type='checkbox' checked={task.complete}/>
                {task.name}
            </label>
        </div>
    );
}

export default Task;
