import locationService from "../../services/locationService";
import {
  GET_FASKES,
  GET_FASKES_BY_ID,
  GET_KELURAHAN_BY_ID,
  GET_KELURAHAN,
  GET_LOCATION,
  GET_LOCATION_BY_ID,
  GET_LOCATION_FASKES
} from "../types";

export const getLocation = (params, history) =>
  async function (dispatch) {
    try {
      const response = await locationService.getLocation(params);
      dispatch({ type: GET_LOCATION, payload: response.data });
      // console.log(response)
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

  export const getLocationFaskes = (params, history) =>
  async function (dispatch) {
    try {
      const response = await locationService.getLocFaskes(params);
      dispatch({ type: GET_LOCATION_FASKES, payload: response.data });
      // console.log(response)
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const getLocationById = (id) =>
  async function (dispatch) {
    try {
      const response = await locationService.getLocationById(id);
      dispatch({ type: GET_LOCATION_BY_ID, payload: response.data });
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const getKelurahan = (params, history) =>
  async function (dispatch) {
    try {
      const response = await locationService.getKelurahan(params);
      dispatch({ type: GET_KELURAHAN, payload: response.data });
      // console.log(response)
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const getKelurahanById = (id) =>
  async function (dispatch) {
    try {
      const response = await locationService.getKelurahanById(id);
      dispatch({ type: GET_KELURAHAN_BY_ID, payload: response.data });
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const getFaskes = (params, history) =>
  async function (dispatch) {
    try {
      const response = await locationService.getFaskes(params);
      dispatch({ type: GET_FASKES, payload: response.data });
      // console.log(response)
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

export const getFaskesById = (id) =>
  async function (dispatch) {
    try {
      const response = await locationService.getFaskesById(id);
      dispatch({ type: GET_FASKES_BY_ID, payload: response.data });
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };
