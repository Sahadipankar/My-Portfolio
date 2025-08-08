// UpdatePassword component allows the user to change their password.
// Handles form state, validation, and dispatches update actions to Redux.
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

/**
 * UpdatePassword component allows the user to change their password.
 * Handles form state, validation, and dispatches update actions to Redux.
 */
const Profile = () => {
  // Form state for password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // Get user state from Redux store
  const { loading, isAuthenticated, error, message, isUpdated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // Handle password update action
  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  // Handle side effects for error, success, and update state
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message]);
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-2 sm:py-4 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-200 mt-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Update Password</h1>
        <p className="text-balance text-muted-foreground mb-8 text-center">Update Your Password</p>
        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
            />
          </div>
          <div className="grid gap-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
            />
          </div>
          <div className="grid gap-2">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
            />
          </div>
          {!loading ? (
            <Button
              type="button"
              onClick={handleUpdatePassword}
              className="w-56 self-end bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
            >
              Update Password
            </Button>
          ) : (
            <SpecialLoadingButton content={"Updating Password"} width="w-56" />
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
