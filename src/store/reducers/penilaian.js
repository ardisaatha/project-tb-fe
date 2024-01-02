import { CREATE_PENILAIAN, GET_PENILAIAN_PUSK, UPDATE_PENILAIAN_PUSK } from "../types";

const initialState = {
  data: [],
  nilai: false,
  nilaiPusk: false
};

const penilaianReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PENILAIAN:
      return {
        ...state,
        data: payload.data,
      };

      case GET_PENILAIAN_PUSK:
      return {
        ...state,
        nilaiPusk: payload.data,
        // loading: false,
      };

      case UPDATE_PENILAIAN_PUSK:
      return {
        ...state,
        nilai: payload.data,
        // loading: false,
      };

    default:
      return state;
  }
};

export default penilaianReducers;
