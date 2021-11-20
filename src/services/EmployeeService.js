import http from "../http-common";

const getAll = () => {
  return http.get("/employees");
};

const get = (id) => {
  return http.get(`/employees/${id}`);
};

const create = (data) => {
  return http.post("/employees", data);
};

const update = (id, data) => {
  return http.put(`/employees/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/employees/${id}`);
};

const findByName = (name) => {
  return http.post("/employees/search", name);
};

const login = (data) => {
  return http.post("/employees/login", data)
}

const EmployeeService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
  login
};

export default EmployeeService;