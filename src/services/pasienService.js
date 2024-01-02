import API from "./api";

const PasienService = {
  getPasien: async function (data) {
    try {
      const response = await API.get("/api/pasien", data);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },

  getPasienById: async function (id) {
    try {
      const response = await API.get(`/api/pasien/${id}`);
      return response;
    } catch (err) {
      // console.log("pasien service error", err);
      throw err;
    }
  },

  getPasienByIdKel: async function (id) {
    try {
      const response = await API.get(`/api/pasien/kel/${id}`);
      return response;
    } catch (err) {
      // console.log("pasien service error", err);
      throw err;
    }
  },

  filterPasien: async function (data) {
    try {
      const response = await API.get('/api/pasien/filter', {
        params: {...data}
      })
      return response
    } catch (err) {
      // console.log("filter pasien API Error", err)
      throw err
    }
  }
}

export default PasienService