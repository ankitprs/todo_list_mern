import axios from "./axios.js"

export class Service {

  async createTask({ title, description, userToken }) {
    try {
      const res = await axios.post("/task/addTask", { title, description }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  async resgisterUser({ formData }) {
    try {
      const result = await axios.post("/user/register", formData)
      return result;
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async taskCompltedToggle({ id, isCompleted, userToken }) {
    try {
      const result = await axios.post("/task/completedTask", { id, isCompleted }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      return result
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async deleteTask({ id, userToken }) {
    try {
      const result = await axios.post("/task/removeTask", { id }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      return result;
    } catch (error) {
      console.log(error);
      return error
    }
  }
}

const service = new Service()
export default service