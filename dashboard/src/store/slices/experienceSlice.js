import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;

export const getAllExperiences = createAsyncThunk(
    "experience/getAllExperiences",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/v1/experience/getall`, { withCredentials: true });
            return data.experiences;
        } catch (error) {
            console.error("Get Experiences Error:", error);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch experiences");
        }
    }
);

export const addNewExperience = createAsyncThunk(
    "experience/addNewExperience",
    async (formData, { rejectWithValue }) => {
        try {
            await axios.post(`${baseUrl}/api/v1/experience/add`, formData, { withCredentials: true });
            const { data } = await axios.get(`${baseUrl}/api/v1/experience/getall`, { withCredentials: true });
            return data.experiences;
        } catch (error) {
            console.error("Add Experience Error:", error, error?.response?.data);
            return rejectWithValue(error.response?.data?.message || "Failed to add experience");
        }
    }
);

export const deleteExperience = createAsyncThunk(
    "experience/deleteExperience",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${baseUrl}/api/v1/experience/delete/${id}`, { withCredentials: true });
            const { data } = await axios.get(`${baseUrl}/api/v1/experience/getall`, { withCredentials: true });
            return data.experiences;
        } catch (error) {
            console.error("Delete Experience Error:", error);
            return rejectWithValue(error.response?.data?.message || "Failed to delete experience");
        }
    }
);

const experienceSlice = createSlice({
    name: "experience",
    initialState: {
        experiences: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        clearAllExperienceErrors: (state) => {
            state.error = null;
        },
        resetExperienceSlice: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllExperiences.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllExperiences.fulfilled, (state, action) => {
                state.loading = false;
                state.experiences = action.payload;
            })
            .addCase(getAllExperiences.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addNewExperience.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.experiences = action.payload;
                state.message = "Experience Added Successfully!";
            })
            .addCase(addNewExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteExperience.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.experiences = action.payload;
                state.message = "Experience Deleted Successfully!";
            })
            .addCase(deleteExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearAllExperienceErrors, resetExperienceSlice } = experienceSlice.actions;
export default experienceSlice.reducer;
