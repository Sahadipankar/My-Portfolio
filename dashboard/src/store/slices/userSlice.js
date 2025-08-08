// ====================================
// USER REDUX SLICE
// ====================================
// This module manages user authentication and profile state for the dashboard.
// Handles login, logout, profile updates, and user data management.
// Central state management for all user-related operations.

// Import Redux Toolkit functions for state management
import { createSlice } from "@reduxjs/toolkit";
// Import Axios for HTTP requests to backend API
import axios from "axios";

/**
 * User Slice Definition
 * Manages authentication state, user profile data, and related UI states.
 * Handles all user operations including login, logout, profile updates.
 *
 * State Structure:
 * - loading: Indicates if an async operation is in progress
 * - user: User profile data object
 * - isAuthenticated: Boolean for authentication status
 * - error: Error messages from failed operations
 * - message: Success messages from operations
 * - isUpdated: Flag indicating if user data was recently updated
 */
const userSlice = createSlice({
  name: "user",

  // ====================================
  // INITIAL STATE DEFINITION
  // ====================================

  initialState: {
    loading: false,         // Loading state for async operations
    user: {},              // User profile data object
    isAuthenticated: false, // Authentication status
    error: null,           // Error messages from failed operations
    message: null,         // Success messages from operations
    isUpdated: false,      // Flag indicating if user data was recently updated
  },

  // ====================================
  // REDUCER FUNCTIONS
  // ====================================

  reducers: {
    // ====================================
    // LOGIN REDUCERS
    // ====================================

    /**
     * Handle login request initiation
     * Sets loading state and clears previous data
     */
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },

    /**
     * Handle successful login
     * Sets user data and authentication status
     */
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },

    /**
     * Handle failed login
     * Sets error message and clears user data
     */
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // ====================================
    // LOGOUT REDUCERS
    // ====================================

    /**
     * Handle successful logout
     * Clears user data and authentication status
     */
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },

    /**
     * Handle failed logout
     * Maintains current state if logout fails
     */
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated; // Preserve current auth state
      state.user = state.user;                       // Preserve current user data
      state.error = action.payload;
    },

    // ====================================
    // USER DATA LOADING REDUCERS
    // ====================================

    /**
     * Handle user data loading request
     * Used for initial app load and refreshing user data
     */
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    /**
     * Handle update password request
     * Sets loading state and resets update/message/error flags
     */
    updatePasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    /**
     * Handle successful password update
     * Sets update flag and success message
     */
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    /**
     * Handle failed password update
     * Sets error message and resets update/message flags
     */
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    /**
     * Handle update profile request
     * Sets loading state and resets update/message/error flags
     */
    updateProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    /**
     * Handle successful profile update
     * Sets update flag and success message
     */
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    /**
     * Handle failed profile update
     * Sets error message and resets update/message flags
     */
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    /**
     * Reset update and message flags after profile update
     * Used to clear state after a successful update
     */
    updateProfileResetAfterUpdate(state, action) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    /**
     * Clear all error messages in the user slice
     * Used to reset error state after handling errors in the UI
     */
    clearAllErrors(state, action) {
      state.error = null;
      // Note: The line below is a no-op, but kept for consistency.
      state.user = state.user;
    },
  },
});

const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/user/login`,
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/user/me`, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/v1/user/logout`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/v1/user/password/update`,
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    }
  };

export const updateProfile = (data) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      `${baseUrl}/api/v1/user/me/profile/update`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.updateProfileFailed(error.response.data.message)
    );
  }
};
export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
