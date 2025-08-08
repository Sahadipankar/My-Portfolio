// Profile component displays the user's profile information in a read-only format.
// Shows profile image, resume, and basic user details.
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

/**
 * Profile component displays the user's profile information in a read-only format.
 * Shows profile image, resume, and basic user details.
 */
const Profile = () => {
  // Get user data from Redux store
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Profile header */}
        <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Profile</h1>
        <p className="text-balance text-muted-foreground mb-8 text-center">Full Profile Preview</p>
        {/* Profile image and resume section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8 justify-between">
          {/* Profile image */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <Label className="mb-1">Profile Image</Label>
            <img
              src={user && user.avatar && user.avatar.url}
              alt="avatar"
              className="w-40 h-40 object-cover rounded-2xl border border-gray-200 shadow"
            />
          </div>
          {/* Resume preview */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <Label className="mb-1">Resume</Label>
            <Link to={user && user.resume && user.resume.url} target="_blank" className="flex justify-center w-full">
              <img
                src={user && user.resume && user.resume.url}
                alt="resume"
                className="w-40 h-40 object-cover rounded-2xl border border-gray-200 shadow hover:scale-105 transition mx-auto"
              />
            </Link>
          </div>
        </div>
        {/* User details section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input type="text" defaultValue={user.fullName} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" defaultValue={user.email} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input type="text" defaultValue={user.phone} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label>About Me</Label>
            <Textarea defaultValue={user.aboutMe} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 min-h-[80px]" />
          </div>
          <div className="grid gap-2">
            <Label>Portfolio URL</Label>
            <Input type="text" defaultValue={user.portfolioURL} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
          <div className="grid gap-2">
            <Label>LinkedIn URL</Label>
            <Input type="text" defaultValue={user.linkedInURL} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
          <div className="grid gap-2">
            <Label>Github URL</Label>
            <Input type="text" defaultValue={user.githubURL} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
          <div className="grid gap-2">
            <Label>Instagram URL</Label>
            <Input type="text" defaultValue={user.instagramURL} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
          <div className="grid gap-2">
            <Label>Twitter(X) URL</Label>
            <Input type="text" defaultValue={user.twitterURL} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
          <div className="grid gap-2">
            <Label>Facebook URL</Label>
            <Input type="text" defaultValue={user.facebookURL} disabled className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
