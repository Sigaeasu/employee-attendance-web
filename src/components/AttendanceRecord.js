import React, {useState, useEffect, useMemo } from "react"
import { useTable } from "react-table";
import { useLocation } from 'react-router-dom'
import AttendanceService from "../services/AttendanceService";

const AttendanceRecord = (props) => {
    const {state} = useLocation(); 
    const { employee_id, employee_name } = state;

    const [attendance, setAttendance] = useState([])

    useEffect(() => {
        retrieveEmployees();
    // eslint-disable-next-line
    }, []);

    const retrieveEmployees = () => {
        AttendanceService.getByEmployee(employee_id)
            .then((response) => {
                setAttendance(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Picture",
                accessor: "picture",
            },
            {
                Header: "Time of Attendance",
                accessor: "updated_at",
            }
        ],
        []
    );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: attendance,
    });

    return (
        <div className="list row">
            <div className="col-md-12 list">
                <h1><b>Attendances List</b></h1>
                <h4>Name : {employee_name}</h4>
                <table
                className="table table-striped table-bordered"
                {...getTableProps()}
                >
                <thead>
                    {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return (
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            );
                        })}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default AttendanceRecord