import React, { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import classes from './EditEmployee.module.css';
import EmployeeService from "../services/EmployeeService";

const isEmpty = value => value.trim() === ''

const EditEmployee = () => {
    const {state} = useLocation(); 
    const { employee_id } = state;

    const [employee, setEmployee] = useState([])
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        username: true,
        password: true,
        email: true,
        phone: true,
        role: true
    })

    useEffect(() => {
        retrieveEmployee();
        // eslint-disable-next-line
    }, []);

    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)

    const nameInputRef = useRef()
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
    const emailInputRef = useRef()
    const phoneInputRef = useRef()
    const roleInputRef = useRef()

    const saveEmployee = (event) => {
        event.preventDefault();

        setIsSuccess(false)
        setIsError(false)

        const enteredName = nameInputRef.current.value
        const enteredUsername = usernameInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredPhone = phoneInputRef.current.value
        const enteredRole = roleInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredUsernameIsValid = !isEmpty(enteredUsername)
        const enteredPasswordIsValid = !isEmpty(enteredPassword)
        const enteredEmailIsValid = !isEmpty(enteredEmail)
        const enteredPhoneIsValid = !isEmpty(enteredPhone)
        const enteredRoleIsValid = !isEmpty(enteredRole)

        setFormInputValidity({
            name: enteredNameIsValid,
            username: enteredUsernameIsValid,
            password: enteredPasswordIsValid,
            email: enteredEmailIsValid,
            phone: enteredPhoneIsValid,
            role: enteredRoleIsValid
        })

        const formIsValid = 
            enteredNameIsValid &&
            enteredUsernameIsValid &&
            enteredPasswordIsValid &&
            enteredEmailIsValid &&
            enteredPhoneIsValid &&
            enteredRole
    
        if (!formIsValid) {
            return
        }

        var data = {
        name: enteredName,
        username: enteredUsername,
        password: enteredPassword,
        email: enteredEmail,
        phone: parseInt(enteredPhone),
        role_id: parseInt(enteredRole)
        };

        EmployeeService.update(employee_id, data)
        .then(response => {
            setIsSuccess(true)
        })
        .catch(e => {
            console.log(e);
            setIsError(true)
        });
    };

    const retrieveEmployee = () => {
        EmployeeService.get(employee_id)
            .then((response) => {
                setEmployee(response.data[0]);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const nameControlClasses = `form-group ${
        formInputValidity.name ? '' : classes.invalid
    }`

    const usernameControlClasses = `form-group ${
        formInputValidity.username ? '' : classes.invalid
    }`

    const passwordControlClasses = `form-group ${
        formInputValidity.password ? '' : classes.invalid
    }`

    const emailControlClasses = `form-group ${
        formInputValidity.email ? '' : classes.invalid
    }`

    const phoneControlClasses = `form-group ${
        formInputValidity.phone ? '' : classes.invalid
    }`

    const roleControlClasses = `form-group ${
        formInputValidity.role ? '' : classes.invalid
    }`

    return (
        <div className={'submit-form ' + classes.form}>
        <h1>FORM</h1>
        <div className={nameControlClasses}>
            <label htmlFor="name">Full Name</label>
            <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            ref={nameInputRef}
            value={employee.name}
            onChange={e => setEmployee({name: e.target.value})}
            required
            />
        </div>

        <div className={usernameControlClasses}>
            <label htmlFor="username">Userame</label>
            <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                ref={usernameInputRef}
                value={employee.username}
                onChange={e => setEmployee({username: e.target.value})}
                required
            />
        </div>

        <div className={passwordControlClasses}>
            <label htmlFor="password">Password</label>
            <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                ref={passwordInputRef}
                required
            />
        </div>

        <div className={emailControlClasses}>
            <label htmlFor="email">Email</label>
            <input
                className="form-control"
                type="text"
                id="email"
                name="email"
                ref={emailInputRef}
                value={employee.email}
                onChange={e => setEmployee({email: e.target.value})}
                required
            />
        </div>

        <div className={phoneControlClasses}>
            <label htmlFor="phone">Phone</label>
            <input
                className="form-control"
                type="number"
                id="phone"
                name="phone"
                ref={phoneInputRef}
                value={employee.phone}
                onChange={e => setEmployee({phone: e.target.value})}
                required
            />
        </div>

        <div className={roleControlClasses}>
            <label htmlFor="role">Role</label>
            <select 
                className="form-control"
                id="role"
                name="role"
                ref={roleInputRef}
                value={employee.role_id}
                onChange={e => setEmployee({role_id: e.target.value})}
                required
            >
            <option selected disabled>Please Select</option>
            <option value='1'>Admin</option>
            <option value='0'>Staff</option>
            </select>
        </div>

        <button onClick={saveEmployee} className={"btn btn-success " + classes.button}>
            Submit
        </button>

        {isSuccess && <p className={classes.success}>Success !</p>}
        {isError && <p className={classes.error}>There is something wrong !</p>}
        </div>
    );
};

export default EditEmployee;