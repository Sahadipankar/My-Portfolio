// AddSkill component allows the user to add a new skill to their portfolio.
// Handles form state, validation, and dispatches add actions to Redux.
import {
  addNewSkill,
  clearAllSkillErrors,
  getAllSkills,
  resetSkillSlice,
} from "@/store/slices/skillSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";

/**
 * AddSkill component allows the user to add a new skill to their portfolio.
 * Handles form state, validation, and dispatches add actions to Redux.
 */
const AddSkill = () => {
  // Form state for skill fields
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [category, setCategory] = useState("frontend");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  // Handle SVG file input and preview
  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  // Get skill state from Redux store
  const { loading, message, error } = useSelector((state) => state.skill);
  const dispatch = useDispatch();
  // Handle add new skill action
  const handleAddNewSkill = (e) => {
    e && e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("category", category);
    formData.append("svg", svg);
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <form
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        onSubmit={handleAddNewSkill}
      >
        <h2 className="font-bold text-3xl text-indigo-700 mb-8 text-center tracking-tight">
          Add a New Skill
        </h2>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="React.JS"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Proficiency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="30"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="programming languages">Programming Languages</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="tools">Tools</option>
              <option value="libraries">Libraries</option>
            </select>
          </div>
          {/* Skill SVG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill SVG</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-xl p-6 bg-indigo-50">
              {svgPreview ? (
                <img
                  className="mx-auto h-16 w-16 object-contain rounded-lg shadow-md border border-gray-200 bg-white"
                  src={svgPreview}
                  alt="Skill SVG Preview"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-indigo-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <div className="mt-4 flex flex-col items-center gap-2">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleSvg}
                  />
                </label>
                <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end">
          {!loading ? (
            <Button
              type="submit"
              onClick={() => handleAddNewSkill()}
              className="w-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
            >
              Add Skill
            </Button>
          ) : (
            <SpecialLoadingButton content={"Adding New Skill"} width="w-56" />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
