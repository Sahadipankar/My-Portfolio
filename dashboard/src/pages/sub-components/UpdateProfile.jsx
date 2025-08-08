// UpdateProfile component allows the user to update their profile information.
// Handles form state, validation, and dispatches update actions to Redux.
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Link } from "react-router-dom";

/**
 * UpdateProfile component allows the user to update their profile information.
 * Handles form state, validation, and dispatches update actions to Redux.
 */
const UpdateProfile = () => {
  // Get user state from Redux store
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  // Form state for each profile field
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Update Profile</h1>
        <p className="text-balance text-muted-foreground mb-8 text-center">Update Your Profile Here</p>
        <form className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-8 justify-between">
            <div className="flex-1 flex flex-col items-center gap-3">
              <Label>Profile Image</Label>
              <img
                src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                alt="avatar"
                className="w-40 h-40 object-cover rounded-2xl border border-gray-200 shadow"
              />
              <label className="w-full cursor-pointer mt-2">
                <div className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition">
                  Upload Image
                  <input
                    type="file"
                    onChange={avatarHandler}
                    className="hidden"
                  />
                </div>
              </label>
            </div>
            <div className="flex-1 flex flex-col items-center gap-3">
              <Label>Resume</Label>
              <Link
                to={user && user.resume && user.resume.url}
                target="_blank"
                className="w-full"
              >
                <img
                  src={resumePreview ? resumePreview : "/avatarHolder.jpg"}
                  alt="resume"
                  className="w-40 h-40 object-cover rounded-2xl border border-gray-200 shadow"
                />
              </Link>
              <label className="w-full cursor-pointer mt-2">
                <div className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition">
                  Upload Resume
                  <input
                    type="file"
                    onChange={resumeHandler}
                    className="hidden"
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Your Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label>About Me</Label>
              <Textarea
                placeholder="About Me"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 min-h-[80px]"
              />
            </div>
            <div className="grid gap-2">
              <Label>Portfolio URL</Label>
              <Input
                type="text"
                placeholder="Portfolio URL"
                value={portfolioURL}
                onChange={(e) => setPortfolioURL(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input
                type="text"
                placeholder="LinkedIn URL"
                value={linkedInURL}
                onChange={(e) => setLinkedInURL(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>Github URL</Label>
              <Input
                type="text"
                placeholder="Github URL"
                value={githubURL}
                onChange={(e) => setGithubURL(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input
                type="text"
                placeholder="Instagram URL"
                value={instagramURL}
                onChange={(e) => setInstagramURL(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>Twitter(X) URL</Label>
              <Input
                type="text"
                placeholder="Twitter(X) URL"
                value={twitterURL}
                onChange={(e) => setTwitterURL(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>Facebook URL</Label>
              <Input
                type="text"
                placeholder="Facebook URL"
                value={facebookURL}
                onChange={(e) => setFacebookURL(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {!loading ? (
              <Button
                type="button"
                onClick={handleUpdateProfile}
                className="w-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
              >
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating"} width="w-56" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
