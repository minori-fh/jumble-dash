import axios from "axios";

export default {
  createproblem: function(body) {
    return axios.post("/api/problem", body);
  },
  getunsolvedproblems: function(id) {
    return axios.get("/api/problem/" + id + "/unsolved");
  },
  getsolvedproblems: function(id) {
    return axios.get("/api/problem/" + id + "/solved");
  },
  updateproblem: function(id, body) {
    return axios.put("/api/problem/" + id, body);
  },
  removeproblem: function(id) {
    return axios.delete("/api/problem/" + id);
  }
};