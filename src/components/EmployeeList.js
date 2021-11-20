import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import classes from './EmployeeList.module.css';
import EmployeeService from "../services/EmployeeService";

const EmployeeList = (props) => {
  const [employee, setEmployee] = useState([]);
  const [searchName, setSearchName] = useState("");
  const employeesRef = useRef();
  const navigate = useNavigate();

  employeesRef.current = employee;

  useEffect(() => {
    retrieveEmployees();
  }, []);

  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const retrieveEmployees = () => {
    EmployeeService.getAll()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    EmployeeService.findByName({name: searchName})
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openAttendances = (id, name) => {
    navigate("/attendance-record", { state: { employee_id: id, employee_name: name } });
  };

  const openEdit = (id) => {
    navigate("/edit", { state: { employee_id: id } });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Full Name",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Role",
        accessor: "role_id",
        Cell: (props) => {
          return props.value === 0 ? "Staff" : "Admin";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const id = props.row.original.id;
          const name = props.row.original.name;
          return (
            <div>
              <span className="btn btn-danger" onClick={() => openAttendances(id, name)}>
                Attendances
              </span>

              <span className="btn btn-warning" onClick={() => openEdit(id)}>
                Edit
              </span>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line
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
    data: employee,
  });

  return (
    <div className="list row">
      <h1>Employees List</h1>
      <div className="col-md-10">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <span className="btn btn-success">
          <Link to={"/add"} className={classes.link}>Add New Employee</Link>
        </span>
      </div>
      <div className="col-md-12 list">
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
  );
};

export default EmployeeList;