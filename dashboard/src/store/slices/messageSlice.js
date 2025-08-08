
// ====================================
// MESSAGE REDUX SLICE
// ====================================
// This module manages the contact messages state for the dashboard.
// Handles fetching, deleting, and error management for messages.
// Central state management for all message-related operations.

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Message Slice Definition
 * Manages contact messages state, CRUD operations, and related UI states.
 *
 * State Structure:
 * - loading: Indicates if an async operation is in progress
 * - messages: Array of contact messages
 * - error: Error messages from failed operations
 * - message: Success messages from operations
 */
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,   // Loading state for async operations
    messages: [],     // Array of contact messages
    error: null,      // Error messages from failed operations
    message: null,    // Success messages from operations
  },
  reducers: {
    // Fetch all messages - request
    getAllMessagesRequest(state, action) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    // Fetch all messages - success
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    // Fetch all messages - failed
    getAllMessagesFailed(state, action) {
      state.messages = state.messages;
      state.error = action.payload;
      state.loading = false;
    },
    // Delete a message - request
    deleteMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Delete a message - success
    deleteMessageSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    // Delete a message - failed
    deleteMessageFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    // Reset the message slice state
    resetMessageSlice(state, action) {
      state.error = null;
      state.messages = state.messages;
      state.message = null;
      state.loading = false;
    },
    // Clear all error messages
    clearAllErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});


// Base URL for API endpoints
const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;


/**
 * Thunk to fetch all messages from the backend API.
 * Dispatches request, success, and failure actions as appropriate.
 */
export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/message/getall`,
      { withCredentials: true }
    );
    dispatch(
      messageSlice.actions.getAllMessagesSuccess(response.data.messages)
    );
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(error.response.data.message)
    );
  }
};


/**
 * Thunk to delete a message by ID from the backend API.
 * Dispatches request, success, and failure actions as appropriate.
 */
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const response = await axios.delete(
      `${baseUrl}/api/v1/message/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(response.data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(error.response.data.message)
    );
  }
};


/**
 * Action to clear all error messages in the message slice.
 */
export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

/**
 * Action to reset the message slice state.
 */
export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
