import axios from "axios";
import { API } from "../utils/constants";

const link = `${API}/task`;

class TaskService {
  tasks(access_token) {
    return axios
      .get(link, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response);
        }
      });
  }

  create(access_token, title, description, completed, expiration, userId) {
    const data = {
      title,
      description,
      completed,
      expiration,
      userId,
    };

    return axios
      .post(link, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          return response;
        } else {
          throw new Error(response);
        }
      });
  }

  edit(access_token, id, title, description, completed, expiration, userId) {
    const data = {
      title,
      description,
      completed,
      expiration,
      userId,
    };

    return axios
      .put(`${link}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response);
        }
      });
  }

  changeStatus(access_token, id, status){

    const data = {
      "completed": status
    }

    const headers = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }

    return axios.put(`${link}/${id}`, data, headers)
      .then((response)=> {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response);
        }
      })

  }

  delete(access_token, id) {
    return axios
      .delete(`${link}/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response);
        }
      });
  }
}

export default new TaskService();
