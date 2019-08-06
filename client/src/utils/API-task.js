import axios from "axios";

export default {
  createTask: function(body) {
    return axios.post("/api/task", body);
  },
  getTasks: function(id) {
    return axios.get("/api/task/" + id);
  },
  updateTask: function(id, body) {
    return axios.put("/api/task/" + id, body);
  },
  removeTask: function(id) {
    return axios.delete("/api/task/" + id);
  }
};