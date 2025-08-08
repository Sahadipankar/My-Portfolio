/**
 * DASHBOARD OVERVIEW COMPONENT
 * This is the main dashboard component that provides an overview of all portfolio data.
 * Features: Statistics cards, data tables, charts, quick actions, status indicators.
 * UI: Cards layout with organized sections for different data types.
 */

// Import required UI components
import { Badge } from "@/components/ui/badge"; // Status badges
import { Button } from "@/components/ui/button"; // Action buttons
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Card components for organized layout
import { Progress } from "@/components/ui/progress"; // Progress bars for skills
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Table components for data display
import { Tabs, TabsContent } from "@/components/ui/tabs"; // Tab navigation

// Import Redux slices and actions for state management
import { clearAllSkillErrors } from "@/store/slices/skillSlice";
import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import { getAllExperiences } from "@/store/slices/experienceSlice";

// Import React hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";
const Dashboard = () => {
  const navigateTo = useNavigate();

  const handleVisitPortfolio = () => {
    if (user && user.portfolioURL) {
      window.open(user.portfolioURL, "_blank");
    }
  };
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };

  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );
  const { experiences } = useSelector((state) => state.experience);

  const [appId, setAppId] = useState(null);
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllExperiences());
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-4 px-2 sm:py-8 sm:px-4">
      <div className="flex flex-col items-center w-full">
        <main className="w-full max-w-7xl grid flex-1 items-start gap-4 p-2 sm:gap-8 sm:p-4 md:gap-10 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 sm:gap-8 lg:col-span-2">
            {/* Overview Cards */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="col-span-1 sm:col-span-2 bg-white/90 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-14 sm:gap-0 px-4 sm:px-6 py-4">
                  <div className="flex-1">
                    <CardDescription className="max-w-lg text-balance leading-relaxed text-sm sm:text-base">
                      {user && user.aboutMe ? user.aboutMe : ""}
                    </CardDescription>
                    <div className="w-full sm:w-44 mt-4 flex-shrink-0">
                      <Button className="w-full mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600" onClick={handleVisitPortfolio}>Visit Portfolio</Button>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="flex flex-col justify-center bg-white/90 rounded-2xl shadow-xl border border-gray-100">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">Projects Completed</CardTitle>
                  <CardTitle className="text-4xl sm:text-6xl">
                    {Array.isArray(projects) ? projects.length : 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="px-4 sm:px-6">
                  <Button className="w-full sm:w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600" onClick={gotoMangeProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center bg-white/90 rounded-2xl shadow-xl border border-gray-100">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">Skills</CardTitle>
                  <CardTitle className="text-4xl sm:text-6xl">
                    {Array.isArray(skills) ? skills.length : 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="px-4 sm:px-6">
                  <Button className="w-full sm:w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600" onClick={gotoMangeSkills}>Manage Skill</Button>
                </CardFooter>
              </Card>
            </div>
            {/* Projects Table */}
            <Card className="bg-white/90 rounded-2xl shadow-xl border border-gray-100">
              <CardHeader className="px-4 sm:px-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Projects</CardTitle>
                <Button onClick={gotoMangeProjects} className="w-full sm:w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600">
                  Manage Projects
                </Button>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Stack</TableHead>
                        <TableHead className="hidden md:table-cell">Deployed</TableHead>
                        <TableHead className="hidden sm:table-cell">Update</TableHead>
                        <TableHead className="text-right">Visit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects && projects.length > 0 ? (
                        projects.map((element) => (
                          <TableRow className="bg-indigo-50/60 hover:bg-indigo-100/60 transition" key={element._id}>
                            <TableCell>
                              <div className="font-medium">{element.title}</div>
                              <div className="text-xs text-muted-foreground md:hidden">{element.stack} • {element.deployed}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell font-semibold uppercase">{element.stack}</TableCell>
                            <TableCell className="hidden md:table-cell font-semibold uppercase">
                              <Badge className="text-xs bg-indigo-100 text-indigo-700 border-none" variant="secondary">{element.deployed}</Badge>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Link to={`/update/project/${element._id}`}>
                                <Button size="sm" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600">Update</Button>
                              </Link>
                            </TableCell>
                            <TableCell className="text-right">
                              <Link to={element.projectLink} target="_blank">
                                <Button size="sm" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600">Visit</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-lg text-gray-500 py-8">You have not added any project.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            {/* Experience Table */}
            <Card className="mb-4 bg-white/90 rounded-2xl shadow-xl border border-gray-100">
              <CardHeader className="px-4 sm:px-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Experience</CardTitle>
                <Button onClick={() => navigateTo("/manage/experience")}
                  className="w-full sm:w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600">
                  Manage Experience
                </Button>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden sm:table-cell">Banner</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="hidden md:table-cell">Company</TableHead>
                        <TableHead className="hidden lg:table-cell">Date</TableHead>
                        <TableHead className="hidden xl:table-cell">Description</TableHead>
                        <TableHead className="hidden xl:table-cell">Skills</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(experiences) && experiences.length > 0 ? (
                        experiences.slice(0, 3).map((element) => (
                          <TableRow className="bg-indigo-50/60 hover:bg-indigo-100/60 transition" key={element._id}>
                            <TableCell className="hidden sm:table-cell">
                              <img src={element.experienceBanner && element.experienceBanner.url} alt={element.role} className="w-12 h-12 rounded-lg border border-gray-200 bg-white object-cover" />
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{element.role}</div>
                              <div className="text-xs text-muted-foreground md:hidden">{element.company}</div>
                              <div className="text-xs text-muted-foreground lg:hidden mt-1">{element.date}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{element.company}</TableCell>
                            <TableCell className="hidden lg:table-cell">{element.date}</TableCell>
                            <TableCell className="hidden xl:table-cell">{element.desc}</TableCell>
                            <TableCell className="hidden xl:table-cell">{Array.isArray(element.skills) ? element.skills.join(", ") : element.skills}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-lg text-gray-500 py-8">You have not added any experience.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            {/* Software Applications & Timeline */}
            <div className="grid grid-cols-1 min-[1050px]:grid-cols-2 gap-4 sm:gap-6">
              <Card className="bg-white/90 rounded-2xl shadow-xl border border-gray-100">
                <CardHeader className="px-4 sm:px-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg sm:text-xl">Software Applications</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden sm:table-cell">Icon</TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications && softwareApplications.length > 0 ? (
                          softwareApplications.map((element) => (
                            <TableRow className="bg-indigo-50/60 hover:bg-indigo-100/60 transition" key={element._id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2 sm:gap-0">
                                  <img className="w-6 h-6 rounded bg-white border border-gray-200 sm:hidden" src={element.svg && element.svg.url} alt={element.name} />
                                  {element.name}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <img className="w-7 h-7 rounded bg-white border border-gray-200" src={element.svg && element.svg.url} alt={element.name} />
                              </TableCell>
                              <TableCell className="text-center">
                                {appLoading && appId === element._id ? (
                                  <SpecialLoadingButton content={"Deleting"} width={"w-fit"} />
                                ) : (
                                  <Button size="sm" className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white font-semibold shadow-md hover:from-red-600 hover:to-pink-600" onClick={() => handleDeleteSoftwareApp(element._id)}>
                                    Delete
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-lg text-gray-500 py-8">You have not added any software application.</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 rounded-2xl shadow-xl border border-gray-100">
                <CardHeader className="px-4 sm:px-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg sm:text-xl">Timeline</CardTitle>
                  <Button onClick={gotoMangeTimeline} className="w-full sm:w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600">Manage Timeline</Button>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden sm:table-cell">From</TableHead>
                          <TableHead className="hidden sm:table-cell text-right">To</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => (
                            <TableRow className="bg-indigo-50/60 hover:bg-indigo-100/60 transition" key={element._id}>
                              <TableCell className="font-medium">
                                <div>{element.title}</div>
                                <div className="text-xs text-muted-foreground sm:hidden">{element.timeline.from} - {element.timeline.to}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">{element.timeline.from}</TableCell>
                              <TableCell className="hidden sm:table-cell text-right">{element.timeline.to}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-lg text-gray-500 py-8">You have not added any timeline.</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Skills Section */}
            <Card className="mb-4 bg-white/90 rounded-2xl shadow-xl border border-gray-100">
              <CardHeader className="px-4 sm:px-7 gap-3">
                <CardTitle className="text-lg sm:text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {skills && skills.length > 0 ? (
                  ["programming languages", "frontend", "backend", "database", "tools", "libraries"].map((cat) => (
                    <div key={cat} className="mb-6">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 capitalize">{cat}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {skills.filter((s) => s.category === cat).length > 0 ? (
                          skills.filter((s) => s.category === cat).map((element) => (
                            <Card key={element._id} className="bg-indigo-50/60 border border-indigo-100 rounded-xl">
                              <CardHeader className="font-semibold text-indigo-700 text-sm sm:text-base px-4 py-3">{element.title}</CardHeader>
                              <CardFooter className="px-4 py-3">{element.proficiency && (
                                <Progress
                                  value={element.proficiency}
                                  className="w-full h-2 bg-indigo-200"
                                />
                              )}</CardFooter>
                            </Card>
                          ))
                        ) : (
                          <p className="text-lg text-muted-foreground">No {cat} skills added.</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg text-gray-500 py-8">You have not added any skill.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
