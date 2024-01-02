import { GET_ALL_USER, CREATE_USER, GET_USER_BY_ID, UPDATE_USER, DELETE_USER } from '../types/index';

const initialState = {
	data: [],
	dataById: false,
	loading: true,
};

const adminReducers = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_USER:
			return {
				...state,
				data: payload.data,
				loading: false,
			};
		case CREATE_USER:
			return {
				...state,
				data: payload.data,
				loading: false,
			};
		case GET_USER_BY_ID:
			return {
				...state,
				dataById: payload.data,
				loading: false,
			};
		case UPDATE_USER:
			return {
				...state,
				dataById: payload.data,
				loading: false,
			};
		case DELETE_USER:
			return {
				...state,
				dataById: payload.data,
				loading: false,
			};

		default:
			return state;
	}
};

export default adminReducers;
