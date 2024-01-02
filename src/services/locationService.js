import API from "./api";

const LocationService = {
  getLocation: async function (data) {
    try {
      const response = await API.get("/api/mapping", data);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },

  getLocFaskes: async function (data) {
    try {
      const response = await API.get("/api/mapping/faskes", data);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },

  getLocationById: async function (id) {
    try {
      const response = await API.get(`/api/mapping/${id}`);
      return response;
    } catch (err) {
      // console.log("location service error", err);
      throw err;
    }
  },

  getKelurahan: async function (data) {
    try {
      const response = await API.get("/api/kelurahan", data);
      // console.log(response);
      return response;
    } catch (error) {
      // console.log(error)
      throw error
    }
  },

  getKelurahanById: async function (id) {
    try {
      const response = await API.get(`/api/kelurahan/${id}`);
      return response;
    } catch (err) {
      // console.log("location service error", err);
      throw err;
    }
  },

  getFaskes: async function (data) {
    try {
      const response = await API.get("/api/faskes", data);
      // console.log(response);
      return response;
    } catch (error) {
      // console.log(error)
      throw error
    }
  },

  getFaskesById: async function (id) {
    try {
      const response = await API.get(`/api/faskes/${id}`);
      return response;
    } catch (err) {
      // console.log("location service error", err);
      throw err;
    }
  },
};

export default LocationService;
