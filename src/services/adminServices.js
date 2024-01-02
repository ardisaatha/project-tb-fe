import API from './api';

const AdminService = {
	getAllUser: async function (data) {
		try {
			const response = await API.get('/api/admin/getuser', data);
			return response;
		} catch (error) {
			// console.log(error);
			throw error;
		}
	},

	createUser: async function (data) {
		try {
			const response = await API.post('/api/admin/createAcc', data);
			return response;
		} catch (error) {
			// console.log('Admin service error', error);
			throw error;
		}
	},

	getUserById: async function (id) {
		try {
			const response = await API.get(`/api/admin/getUser/${id}`);
			return response;
		} catch (err) {
			// console.log(err);
			throw err;
		}
	},

	updateUser: async function (id, data) {
		try {
			const response = await API.put(`/api/admin/updateAcc/${id}`, data);
			// console.log(response)
			return response;
		} catch (error) {
			// console.log('Airport service error', error);
			throw error;
		}
	},

	deleteUser: async function (id) {
		try {
			const response = await API.delete(`/api/admin/deleteAcc/${id}`);
			return response;
		} catch (err) {
			// console.log('Airport service error', err);
			throw err;
		}
	},
};

export default AdminService;
