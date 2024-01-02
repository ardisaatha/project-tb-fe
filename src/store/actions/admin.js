import AdminService from '../../services/adminServices';
import { GET_ALL_USER, CREATE_USER, GET_USER_BY_ID, UPDATE_USER, DELETE_USER } from '../types/index';

export const getAllUser = (params, history) =>
	async function (dispatch) {
		try {
			const response = await AdminService.getAllUser(params);
			dispatch({ type: GET_ALL_USER, payload: response.data });
		} catch (error) {
			// console.log(error);
			throw error;
		}
	};
export const getUserById = (id) =>
	async function (dispatch) {
		try {
			const response = await AdminService.getUserById(id);
			// console.log(response);
			dispatch({ type: GET_USER_BY_ID, payload: response.data });
			return response;
		} catch (error) {
			// console.log(error);
			throw error;
		}
	};

export const createUser = (params, history) =>
	async function (dispatch) {
		try {
			const response = await AdminService.createUser(params, history);
			dispatch({ type: CREATE_USER, payload: response.data });
			history("/admin")
			return;
		} catch (error) {
			// console.log(error);
			throw error;
		}
	};

export const updateUser = (id, params) =>
	async function (dispatch) {
		try {
			const response = await AdminService.updateUser(id, params);
			// console.log(response)
			dispatch({ type: UPDATE_USER, payload: response.data });
		} catch (error) {
			// console.log(error);
			throw error;
		}
	};

export const deleteUser = (id) =>
	async function (dispatch) {
		try {
			const response = await AdminService.deleteUser(id);
			// console.log(response);
			dispatch({ type: DELETE_USER, payload: response });
			return response;
		} catch (error) {
			// console.log(error);
			throw error;
		}
	};
