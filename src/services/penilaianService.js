import API from "./api";

const PenilaianService = {
  createPenilaian: async function (data) {
    try {
      const response = await API.post("/api/nilai/create", data);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },

  getNilaiByPusk: async function (id) {
    try {
      const response = await API.get(`/api/nilai/getNilaiPusk/${id}`);
      return response;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  },
  
  updateNilaiByPusk: async function (id, data) {
    try {
      const response = await API.put(`/api/nilai/update/${id}`, data);
      return response;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  },

  deleteNilaiPusk: async function (id) {
    try {
      const response = await API.delete(`/api/nilai/deleteNilai/${id}`);
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },
};

export default PenilaianService;
