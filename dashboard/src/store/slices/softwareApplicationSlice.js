// ====================================
// SOFTWARE APPLICATION REDUX SLICE
// ====================================
// This module manages the software applications state for the dashboard.
// Handles CRUD operations for software tools used in the portfolio.
// Central state management for all software application-related operations.

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Software Application Slice Definition
 * Manages software applications state, CRUD operations, and related UI states.
 *
 * State Structure:
 * - loading: Indicates if an async operation is in progress
 * - softwareApplications: Array of software application entries
 * - error: Error messages from failed operations
 * - message: Success messages from operations
 */
const softwareApplicationSlice = createSlice({
  name: "softwareApplications",
  initialState: {
    loading: false,                 // Loading state for async operations
    softwareApplications: [],       // Array of software application entries
    error: null,                    // Error messages from failed operations
    message: null,                  // Success messages from operations
  },
  reducers: {
    // Fetch all software applications - request
    getAllsoftwareApplicationsRequest(state, action) {
      state.softwareApplications = [];
      state.error = null;
      state.loading = true;
    },
    // Fetch all software applications - success
    getAllsoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.error = null;
      state.loading = false;
    },
    // Fetch all software applications - failed
    getAllsoftwareApplicationsFailed(state, action) {
      state.softwareApplications = state.softwareApplications;
      state.error = action.payload;
      state.loading = false;
    },
    // Add new software application - request
    addNewsoftwareApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Add new software application - success
    addNewsoftwareApplicationsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    // Add new software application - failed
    addNewsoftwareApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deletesoftwareApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletesoftwareApplicationsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deletesoftwareApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetSoftwareApplicationSlice(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
    },
  },
});

const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllsoftwareApplicationsRequest()
  );
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/softwareapplication/getall`,
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.getAllsoftwareApplicationsSuccess(
        response.data.softwareApplications
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllsoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.addNewsoftwareApplicationsRequest()
  );
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/softwareapplication/add`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationsSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.deletesoftwareApplicationsRequest()
  );
  try {
    const response = await axios.delete(
      `${baseUrl}/api/v1/softwareapplication/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllSoftwareAppErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetSoftwareApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
};

export default softwareApplicationSlice.reducer;
