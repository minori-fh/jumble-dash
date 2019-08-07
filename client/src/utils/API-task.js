import axios from "axios";

export default {
  createTask: function(body) {
    return axios.post("/api/task", body);
  },
  getTasks: function(id) {
    return axios.get("/api/task/" + id);
  },
  getIncompleteTasks: function(id) {
    return axios.get("/api/task/" + id + "/incomplete");
  },
  updateTask: function(id, body) {
    return axios.put("/api/task/" + id, body);
  },
  updateTaskStatus: function(id, complete){
    return axios.put("/api/task" + id, complete)
  },
  removeTask: function(id) {
    return axios.delete("/api/task/" + id);
  }
};