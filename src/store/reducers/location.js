import {
  GET_KELURAHAN_BY_ID,
  GET_KELURAHAN,
  GET_LOCATION,
  GET_LOCATION_BY_ID,
  GET_FASKES,
  GET_FASKES_BY_ID,
  GET_LOCATION_FASKES,
} from "../types";

const initialState = {
  data: [],
  dataKel: [],
  dataFas: [],
  locFaskes: [],
  dataById: false,
  dataKelId: false,
  dataFasId: false,
  totalPas: false,
  survei: false,
  hit: false,
  pasien: false,
  loading: true,
};

const locationReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATION:
      return {
        ...state,
        data: payload.data,
        loading: false,
      };
    case GET_LOCATION_FASKES:
      return {
        ...state,
        locFaskes: payload.data,
        loading: false,
      };
    case GET_LOCATION_BY_ID:
      return {
        ...state,
        dataById: payload.data.find,
        totalPas: payload.data.find.pasienbs.length,
        survei: payload.data,
        hit: payload.data.find.survei,
        loading: false,
        pasien: payload.data.pasiens,
      };
    case GET_KELURAHAN:
      return {
        ...state,
        dataKel: payload.data,
        loading: false,
      };
    case GET_KELURAHAN_BY_ID:
      return {
        ...state,
        dataKelId: payload.data,
        loading: false,
      };
    case GET_FASKES:
      return {
        ...state,
        dataFas: payload.data,
        loading: false,
      };
    case GET_FASKES_BY_ID:
      return {
        ...state,
        dataFasId: payload.data,
        loading: false,
      };

    default:
      return state;
  }
};

export default locationReducers;
