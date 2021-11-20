import React, { useState, useRef } from "react";
import classes from './Login.module.css';
import EmployeeService from "../services/EmployeeService";

const isEmpty = value => value.trim() === ''

const Login = (props) => {
    const [isValid, setIsValid] = useState(true)
    const [formInputValidity, setFormInputValidity] = useState({
        username: true,
        password: true
    })

    const usernameInputRef = useRef()
    const passwordInputRef = useRef()

    const loginHandler = (event) => {
        event.preventDefault();

        setIsValid(true)

        const enteredUsername = usernameInputRef.current.value
        const enteredPassword = passwordInputRef.current.value

        const enteredUsernameIsValid = !isEmpty(enteredUsername)
        const enteredPasswordIsValid = !isEmpty(enteredPassword)

        setFormInputValidity({
            username: enteredUsernameIsValid,
            password: enteredPasswordIsValid
        })

        const formIsValid = 
            enteredUsernameIsValid &&
            enteredPasswordIsValid 
        
        if (!formIsValid) {
            return
        }

        var data = {
            username: enteredUsername,
            password: enteredPassword,
        };
      
        EmployeeService.login(data)
            .then(response => {
                console.log(response.data);
                if (response.data.error === true) {
                    setIsValid(false)
                } else {
                    props.onLogin(response.data.data)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const usernameControlClasses = `form-group ${
        formInputValidity.username ? '' : classes.invalid
    }`

    const passwordControlClasses = `form-group ${
        formInputValidity.password ? '' : classes.invalid
    }`

    return (
        <div className={'submit-form ' + classes.login}>
            <h1>LOGIN</h1>
            
            <div className={usernameControlClasses}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    ref={usernameInputRef}
                    required
                />
            </div>

            <div className={passwordControlClasses}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    ref={passwordInputRef}
                    required
                />
            </div>

            <button onClick={loginHandler} className={'btn btn-success ' + classes.button}>
                Login
            </button>

            {!isValid && <p className={classes.error}>Wrong username/password !</p>}
        </div>
    );
};

export default Login;

