import http from "../http-common";

const getAll = () => {
    return http.get("/attendances");
};

const get = (id) => {
    return http.get(`/attendances/${id}`);
};

const getByEmployee = (id) => {
    return http.get(`/attendances/employee/${id}`);
};

const create = (data) => {
  return http.post("/attendances", data);
};


const AttendanceService = {
  getAll,
  get,
  create,
  getByEmployee
};

export default AttendanceService;