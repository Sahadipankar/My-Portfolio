// ====================================
// TIMELINE REDUX SLICE
// ====================================
// This module manages the timeline state for the dashboard.
// Handles CRUD operations for career timeline entries.
// Central state management for all timeline-related operations.

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Timeline Slice Definition
 * Manages timeline state, CRUD operations, and related UI states.
 *
 * State Structure:
 * - loading: Indicates if an async operation is in progress
 * - timeline: Array of timeline entries
 * - error: Error messages from failed operations
 * - message: Success messages from operations
 */
const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state, action) {
      state.timeline = [];
      state.error = null;
      state.loading = true;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTimelineFailed(state, action) {
      state.timeline = state.timeline;
      state.error = action.payload;
      state.loading = false;
    },
    addNewTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewTimelineSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    /**
     * Reset the timeline slice state to initial values (except timeline data).
     * Used after successful operations or when clearing state.
     */
    resetTimelineSlice(state, action) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    /**
     * Clear all error messages in the timeline slice.
     * Used to reset error state after handling errors in the UI.
     */
    clearAllErrors(state, action) {
      state.error = null;
      // Note: The line below is a no-op, but kept for consistency.
      state.timeline = state.timeline;
    },
  },
});


// Base URL for API endpoints
const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;


/**
 * Thunk to fetch all timeline entries from the backend API.
 * Dispatches request, success, and failure actions as appropriate.
 */
export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/timeline/getall`,
      { withCredentials: true }
    );
    dispatch(
      timelineSlice.actions.getAllTimelineSuccess(response.data.timelines)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};


/**
 * Thunk to add a new timeline entry to the backend API.
 * Dispatches request, success, and failure actions as appropriate.
 */
export const addNewTimeline = (data) => async (dispatch) => {
  dispatch(timelineSlice.actions.addNewTimelineRequest());
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/timeline/add`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(
      timelineSlice.actions.addNewTimelineSuccess(response.data.message)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.addNewTimelineFailed(error.response.data.message)
    );
  }
};

/**
 * Thunk to delete a timeline entry by ID from the backend API.
 * Dispatches request, success, and failure actions as appropriate.
 */
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const response = await axios.delete(
      `${baseUrl}/api/v1/timeline/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      timelineSlice.actions.deleteTimelineSuccess(response.data.message)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};


/**
 * Action to reset the timeline slice state.
 */
export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

/**
 * Action to clear all error messages in the timeline slice.
 */
export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export default timelineSlice.reducer;
