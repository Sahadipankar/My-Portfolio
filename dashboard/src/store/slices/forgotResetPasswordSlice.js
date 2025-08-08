// ====================================
// FORGOT/RESET PASSWORD REDUX SLICE
// ====================================
// This module manages the forgot and reset password state for the dashboard.
// Handles password reset requests and state management.
// Central state management for all password reset-related operations.

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Forgot/Reset Password Slice Definition
 * Manages password reset state, request/response, and related UI states.
 *
 * State Structure:
 * - loading: Indicates if an async operation is in progress
 * - error: Error messages from failed operations
 * - message: Success messages from operations
 */
const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,   // Loading state for async operations
    error: null,      // Error messages from failed operations
    message: null,    // Success messages from operations
  },
  reducers: {
    // Forgot password request
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Forgot password success
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    // Forgot password failed
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // Reset password request
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Reset password success
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    // Reset password failed
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state;
    },
  },
});

const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
    console.log(email);
    const response = await axios.post(
      `${baseUrl}/api/v1/user/password/forgot`,
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    console.log(response);
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordSuccess(response.data.message)
    );
  } catch (error) {
    console.log(error);
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordFailed(
        error.response.data.message
      )
    );
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
      const response = await axios.put(
        `${baseUrl}/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      dispatch(
        forgotResetPassSlice.actions.resetPasswordSuccess(response.data.message)
      );
    } catch (error) {
      console.log(error);
      dispatch(
        forgotResetPassSlice.actions.resetPasswordFailed(
          error.response.data.message
        )
      );
    }
  };

export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;
