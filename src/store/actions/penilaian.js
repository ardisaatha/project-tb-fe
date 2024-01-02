import penilaianServices from "../../services/penilaianService";
import {
  CREATE_PENILAIAN,
  DELETE_PENILAIAN_PUSK,
  GET_PENILAIAN_PUSK,
  UPDATE_PENILAIAN_PUSK,
  //   GET_FASKES_BY_ID,
} from "../types";

export const createNilai = (params, history) =>
  async function (dispatch) {
    try {
      const response = await penilaianServices.createPenilaian(params);
      dispatch({ type: CREATE_PENILAIAN, payload: response.data });
      // console.log(response);
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const getNilaiPusk = (id) =>
  async function (dispatch) {
    try {
      const response = await penilaianServices.getNilaiByPusk(id);
      dispatch({ type: GET_PENILAIAN_PUSK, payload: response.data });
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const updateNilaiPusk = (id, params) =>
  async function (dispatch) {
    try {
      const response = await penilaianServices.updateNilaiByPusk(id, params);
      dispatch({ type: UPDATE_PENILAIAN_PUSK, payload: response.data });
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const deleteNilaiPusk = (id) =>
  async function (dispatch) {
    try {
      const response = await penilaianServices.deleteNilaiPusk(id);
      dispatch({ type: DELETE_PENILAIAN_PUSK, payload: response.data });
      // console.log(response);
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };
