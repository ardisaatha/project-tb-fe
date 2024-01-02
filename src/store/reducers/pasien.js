import { FILTER_PASIEN, GET_PASIEN, GET_PASIEN_BY_ID, GET_PASIEN_BY_ID_KEL } from "../types";

const initialState = {
  data: [],
  dataById: false,
  dataByIdKel: false,
  totalData: false,
  fasyankes: false,
  kelurahan: false,
  loading: true,
};

const pasienReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PASIEN:
      return {
        ...state,
        data: payload.data.data,
        totalData: payload.data.totalData,
        loading: false,
      };
    case GET_PASIEN_BY_ID:
      return {
        ...state,
        dataById: payload.data,
        fasyankes: payload.data.fasyanke,
        kelurahan: payload.data.kelurahan,
        loading: false,
      };

    case GET_PASIEN_BY_ID_KEL:
      return {
        ...state,
        dataByIdKel: payload.data,
        loading: false,
      };

      case FILTER_PASIEN:
      return {
        ...state,
        data: payload.data.data,
        // totalData: payload.data.totalData,
        loading: false,
      };

    default:
      return state;
  }
};

export default pasienReducers;
