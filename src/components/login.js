import React from 'react';
import bcrypt from 'bcryptjs/dist/bcrypt';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';

function Login () {

    const checkUser=((e)=>{
        e.preventDefault();

        const form = e.target;
        const validated = ValidateLogin(form.email.value, form.password.value);
        if(validated){
            window.location.href ='/';
        }
        else{
            swal({
                title: 'Invalid login.',
                text: 'You have entered in valid login details. Please enter valid login details or register a new account.',
                icon: 'error',
            });
        }   
    });

    return (
        <div>
            <div>
                <form id='login-form' onSubmit={checkUser}>
                    <h1>Login</h1>
                    
                    <div className='input-group mb-5'>	
                        <span className='input-group-text'><i className='fas fa-envelope'></i></span>
                        <input className='form-control form-control-lg' type='email' name='email' placeholder='Email' id='email' required />
                    </div>

                    <div className='input-group mb-5'>
                        <span className='input-group-text'><i className='fas fa-lock'></i></span>
                        <input className='form-control form-control-lg' type='password' name='password' placeholder='Password' required />
                    </div>
                    
                    <button className='btn btn-dark btn-lg' type='submit' id='login-btn'>Login</button>
                    <span>Don't have an account? <Link to='/register'>Click here to sigup.</Link></span>
                </form>
            </div>
        </div>
    );
}

export default Login;

function ValidateLogin(email, password){

    let valid = false;
    const  users = JSON.parse(localStorage.getItem('users'));

    for(var i = 0; i < users.length; i++){
        //Find user with same email or employee number
        //if found return user details
        if(users[i].email === email){

            sessionStorage.setItem('userIndex', i);

            if(bcrypt.compareSync(password, users[i].password)){
                valid = true;
                sessionStorage.setItem('user', JSON.stringify(users[i]));
                sessionStorage.setItem('userIndex', i);
            }
            break;
        }
    }

    return valid
}