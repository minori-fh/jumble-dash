import axios from "axios";

export default {
  createAssignee: function(body) {
    return axios.post("/api/assignee", body);
  },
  getAssignees: function(id) {
    return axios.get("/api/assignee/" + id);
  },
  updateAssignee: function(id, body) {
    return axios.put("/api/assignee/" + id, body);
  },
  removeAssignee: function(id) {
    return axios.delete("/api/assignee/" + id);
  }
};