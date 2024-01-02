import API from "./api";

const AuthService = {
  login: async (data) => {
    try {
      const response = await API.post("/api/auth/login", data);
      API.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.data.accessToken}`;
      setHeadersAndStorage(response.data.data);
      return response;
    } catch (err) {
      // console.log("Auth service error", err);
      throw err;
    }
  },

  loginAdmin: async (data) => {
    try {
      const response = await API.post("/api/auth/login/admin", data);
      API.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.data.accessToken}`;
      setHeadersAndStorage(response.data.data);
      return response;
    } catch (err) {
      // console.log("Auth service error", err);
      throw err;
    }
  },

  logout: () => {
    API.defaults.headers["Authorization"] = "";
    localStorage.removeItem("accessToken");
  },
};

const setHeadersAndStorage = ({ name, accessToken, roleId, email }) => {
  API.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
//   localStorage.setItem("name", name);
//   localStorage.setItem("email", email);
//   localStorage.setItem("roleId", roleId);
  localStorage.setItem("accessToken", accessToken);
};

export default AuthService