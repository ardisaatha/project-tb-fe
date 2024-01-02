import PasienService from "../../services/pasienService";
import { FILTER_PASIEN, GET_PASIEN, GET_PASIEN_BY_ID, GET_PASIEN_BY_ID_KEL } from "../types";

export const getPasien = (params, history) =>
  async function (dispatch) {
    try {
      const response = await PasienService.getPasien(params);
      dispatch({ type: GET_PASIEN, payload: response });
      // console.log(response)
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const getPasienById = (id) =>
  async function (dispatch) {
    try {
      const response = await PasienService.getPasienById(id);
      dispatch({ type: GET_PASIEN_BY_ID, payload: response.data });
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const getPasienByIdKel = (id) =>
  async function (dispatch) {
    try {
      const response = await PasienService.getPasienByIdKel(id);
      dispatch({ type: GET_PASIEN_BY_ID_KEL, payload: response.data });
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const filterPasien = (params) => 
async function (dispatch) {
  try {
    const response = await PasienService.filterPasien(params)
    dispatch({type: FILTER_PASIEN, payload: response})
    // console.log(response)
  } catch (error) {
    // console.log(error)
    throw error
  }
}
