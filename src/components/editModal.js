import React, {useState} from 'react';
import { Modal , Button} from 'react-bootstrap';


function EditModal ({tsk, show, handleClose, edit}){

    try{
        const [complete, setComplete] = useState(tsk.complete);
    
        const handleChange = (()=>{
            setComplete(!complete);
        });

        const handleSubmit = ((e)=>{
            e.preventDefault();
            const form = e.target;

            tsk.name = form.name.value;
            tsk.priority = form.priority.value;
            tsk.due = form.due.value;
            tsk.complete = form.complete.value;

            edit(tsk);
        });

        return (
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form id='edit-form' onSubmit={handleSubmit}>
                        
                        <div className='form-floating mb-3 mt-3'>
                            <input className='form-control' name='name' type='text' defaultValue={tsk.name}/>
                            <label for='name'>Task</label>
                        </div>
                        <div class='form-floating mb-3 mt-3'>
                            <input className='form-control' name='due' type='datetime-local' min={new Date().toISOString().slice(0, 16)} defaultValue={tsk.due}/>
                            <label for='due'>Due Date</label>
                        </div>
                        <div class='form-floating mb-3 mt-3'>
                            <select className='form-control' name='priority' >
                                <option value={tsk.priority}>{tsk.priority}</option>
                                <option value='Low'>Low</option>
                                <option value='Moderate'>Moderate</option>
                                <option value='High'>High</option>
                            </select>
                            <label for='priority'>Priority</label>
                        </div>
                        <div className='form-check mb-3 mt-3'>
                            <input className='form-check-input' name='complete' type='checkbox' checked={complete} onChange={handleChange}/>
                            <label for='name'>Task Completed</label>
                        </div>
                    </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
                Close
            </Button>
            <Button variant='primary' onClick={handleClose} type='submit' form='edit-form' >
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        );
    }
    catch{
        return (
            <></>
        );
    }
}

export default EditModal;

