import React from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import storageHelpers from './localStorageExports';

function Register () {
    const registerUser = ((e)=>{
        e.preventDefault();

        const form = e.target;

        if(form.password.value === form.cpassword.value){
            const results = RegisterUser(form);
            if(results){
                
                swal({
                    title: 'Registered successfully',
                    text: 'Your account has been registered',
                    icon: 'success',
                });
            }
            else{
                //if user account is found return error message
                swal({
                    title: 'Registration Failed.',
                    text: 'The email or employee number you have entered has already been used. Please try a different email/employee number or login if you already have an account.',
                    icon: 'error',
                });
            }
        }
        else{
            swal({
                title: `Passwords don't match.`,
                text: `Your password doesn't match the confirm password. Please enter matching password`,
                icon: 'error',
            });
        }
    });

    return (
        <div className='container mt-5'>
            <form id='register-form' onSubmit={registerUser} className='login_form text-center border'>
                <h1 className='mb-5'>Register</h1>
                <div className='input-group mb-5'>
                    <span className='input-group-text'><i className='fas fa-user-tie'></i></span>
                    <input className='form-control' type='text' name='name' placeholder='Name' required /> <span>&emsp;&emsp;</span>
                    <input className='form-control' type='text' name='surname' placeholder='Surname' required />
                </div>
                <div className='input-group mb-5'>	
                    <span className='input-group-text'><i className='fas fa-envelope'></i></span>
                    <input className='form-control' type='email' name='email' placeholder='Email' required />
                </div>
                <div className='input-group mb-5'>	
                    <span className='input-group-text'><i className='fas fa-lock'></i></span>
                    <input className='form-control' type='password' name='password' placeholder='Password' required />
                </div>
                <div className='input-group mb-5'>	
                    <span className='input-group-text'><i className='fas fa-lock'></i></span>
                    <input className='form-control' type='password' name='cpassword' placeholder='Confirm Password' required />
                </div>

                <button className='btn btn-dark btn-lg' type='submit' id='reg-btn'>Register</button><br/>
                <span>Already have an account? <Link to='/login'>Click here to sigin.</Link></span>
            </form>
        </div>
    );
}

export default Register;

function RegisterUser(form){
    //Check if user account doesn't already exists
    let found = false, registered = false;
    const users = JSON.parse(localStorage.getItem('users'));

    for(var i = 0; i < users.length; i++){
        //Find user with same email
        if(users[i].email === form.email.value){
            found = true;
            break;
        }
    }

    //If no user is found, add user to storage
    if(!found){
        const users = JSON.parse(localStorage.getItem('users')),
        password = storageHelpers.hashPassword(form.password.value);

        const user = {
            name: form.name.value,
            surname: form.surname.value,
            email: form.email.value,
            password: password,
            tasks: []
        }

        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));

        sessionStorage.removeItem('profile');
        form.reset();
        registered = true;

    }
    return registered;

}