// ====================================
// PROJECT REDUX SLICE
// ====================================
// This module manages the portfolio projects state for the dashboard.
// Handles CRUD operations for projects in the portfolio.
// Central state management for all project-related operations.

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Project Slice Definition
 * Manages portfolio projects state, CRUD operations, and related UI states.
 *
 * State Structure:
 * - loading: Indicates if an async operation is in progress
 * - projects: Array of project entries
 * - error: Error messages from failed operations
 * - message: Success messages from operations
 * - singleProject: Data for a single project (for view/edit)
 */
const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,         // Loading state for async operations
    projects: [],           // Array of project entries
    error: null,            // Error messages from failed operations
    message: null,          // Success messages from operations
    singleProject: {},      // Data for a single project (for view/edit)
  },
  reducers: {
    // Fetch all projects - request
    getAllProjectsRequest(state, action) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    // Fetch all projects - success
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    // Fetch all projects - failed
    getAllProjectsFailed(state, action) {
      state.projects = state.projects;
      state.error = action.payload;
      state.loading = false;
    },
    // Add new project - request
    addNewProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Add new project - success
    addNewProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    // Add new project - failed
    addNewProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    updateProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetProjectSlice(state, action) {
      state.error = null;
      state.projects = state.projects;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state.projects;
    },
  },
});

const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/project/getall`,
      { withCredentials: true }
    );
    dispatch(
      projectSlice.actions.getAllProjectsSuccess(response.data.projects)
    );
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};

export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/project/add`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(error.response.data.message)
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const response = await axios.delete(
      `${baseUrl}/api/v1/project/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};

export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const response = await axios.put(
      `${baseUrl}/api/v1/project/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.updateProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error);
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
