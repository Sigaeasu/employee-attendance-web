import React from "react";
import classes from './InsertAttendance.module.css';

const ImportAttendance = () => {
    return (
        <div className={'submit-form ' + classes.form}>
            <h1>ATTENDANCE</h1>
            <div className="form-group">
                <label htmlFor="image">Upload Photo</label>
                <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                required
                />
            </div>
        
            <button className={"btn btn-success " + classes.button}>
                Submit
            </button>
        
            {/* {isSuccess && <p className={classes.success}>Success !</p>}
            {isError && <p className={classes.error}>There is something wrong !</p>} */}
        </div>
    )
}

export default ImportAttendance