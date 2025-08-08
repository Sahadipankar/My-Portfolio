// AddTimeline component allows the user to add a new timeline entry to their portfolio.
// Handles form state, validation, and dispatches add actions to Redux.
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";

/**
 * AddTimeline component allows the user to add a new timeline entry to their portfolio.
 * Handles form state, validation, and dispatches add actions to Redux.
 */
const AddTimeline = () => {
  // Form state for timeline fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Get timeline state from Redux store
  const { loading, error, message } = useSelector((state) => state.timeline);

  // Handle add new timeline action
  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  };

  const dispatch = useDispatch();
  // Handle side effects for error and success state
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <form
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        onSubmit={handleAddNewTimeline}
      >
        <h2 className="font-bold text-3xl text-indigo-700 mb-8 text-center tracking-tight">
          Add a New Timeline
        </h2>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="Matriculation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition min-h-[80px]"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Starting Point (From) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Starting Point (From)</label>
            <Input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          {/* Ending Point (To) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ending Point (To)</label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end">
          {!loading ? (
            <Button
              type="submit"
              className="w-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
            >
              Add Timeline
            </Button>
          ) : (
            <SpecialLoadingButton content={"Adding New Timeline"} width="w-56" />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTimeline;
