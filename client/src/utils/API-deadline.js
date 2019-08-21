import axios from "axios";

export default {
  findDeadline: function(id) {
    return axios.get("/api/deadline/" + id);
  },
  createDeadline: function(body) {
    return axios.post("/api/deadline", body);
  },
  updateDeadline: function(id, body) {
    return axios.put("/api/deadline/" + id, body);
  }
};