import React, { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getExperiences = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/experience/getall`,
                    { withCredentials: true }
                );
                setExperiences(data.experiences);
            } catch (err) {
                setError("Failed to fetch experiences");
            } finally {
                setLoading(false);
            }
        };
        getExperiences();
    }, []);

    return (
        <section
            id="experience"
            className="py-16 px-2 md:px-10 lg:px-32 font-sans min-h-screen bg-gradient-to-br relative overflow-x-hidden"
        >
            {/* Static glowing background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
            </div>

            <div className="text-center mb-12 relative z-10">
                <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] to-[#fff] drop-shadow-2xl animate-gradient">Experience</h2>
                <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto font-medium animate-fadein">
                    Explore my professional journey and the roles I've embraced in various organizations.
                </p>
            </div>

            <div className="flex flex-col items-center w-full relative z-10">
                {loading ? (
                    <div className="text-center text-white text-xl">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500 text-lg">{error}</div>
                ) : experiences.length > 0 ? (
                    <div className="relative w-full max-w-3xl">
                        {/* Glowing Timeline vertical line */}
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#8245ec] via-[#fff] to-[#8245ec] shadow-[0_0_10px_5px_rgba(130,69,236,0.5)]"></div>
                        <ul className="space-y-16">
                            {[...experiences].reverse().map((experience, index) => (
                                <li key={experience._id || index} className="relative z-10 min-h-[120px]">
                                    <div className="w-full hidden md:flex flex-row items-center justify-between gap-8">
                                        {/* Left card */}
                                        {index % 2 === 0 ? (
                                            <div className="w-1/2 flex justify-end">
                                                <div className="bg-gradient-to-br from-[#20133e] via-[#0a011f] to-[#020817] bg-opacity-80 backdrop-blur-2xl rounded-2xl shadow-xl border border-[#46247f] p-3 md:p-5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_8px_rgba(130,69,236,0.4)] hover:border-white group-hover:ring-2 group-hover:ring-[#190e2e]">
                                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden shadow-md border border-[#8245ec] animate-fadein">
                                                            <img
                                                                src={experience.experienceBanner?.url || experience.img}
                                                                alt={experience.company}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-between">
                                                            <h3 className="text-xl font-extrabold text-white mb-1 drop-shadow-lg">{experience.role}</h3>
                                                            <h4 className="text-base text-[#aa96be] font-bold mb-1">{experience.company}</h4>
                                                            <p className="text-xs text-gray-400 mt-1 italic">{experience.date}</p>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 text-gray-200 text-base leading-relaxed animate-fadein">{experience.desc}</p>
                                                    <div className="mt-3">
                                                        <h5 className="font-bold text-white mb-2">Skills:</h5>
                                                        <ul className="flex flex-wrap gap-2">
                                                            {(Array.isArray(experience.skills) ? experience.skills : (experience.skills || "").split(",")).map((skill, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="font-semibold capitalize bg-gradient-to-r from-[#8245ec] to-[#fff] text-[#1a1333] px-3 py-1 text-xs md:text-xs rounded-lg border border-[#8245ec] shadow-md hover:scale-110 hover:bg-[#fff] hover:text-[#8245ec] transition-all duration-200 cursor-pointer"
                                                                >
                                                                    {skill}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-1/2"></div>
                                        )}
                                        {/* Timeline Dot always centered */}
                                        <span className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#8245ec] to-[#fff] border-4 border-[#9c82cb] rounded-full flex items-center justify-center shadow-[0_0_20px_5px_rgba(130,69,236,0.7)] z-20 mx-auto">
                                            <img
                                                src={experience.experienceBanner?.url || experience.img}
                                                alt={experience.company}
                                                className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full"
                                            />
                                        </span>
                                        {/* Right card */}
                                        {index % 2 !== 0 ? (
                                            <div className="w-1/2 flex justify-start">
                                                <div className="bg-gradient-to-br from-[#20133e] via-[#0a011f] to-[#020817] bg-opacity-80 backdrop-blur-2xl rounded-2xl shadow-xl border border-[#46247f] p-3 md:p-5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_8px_rgba(130,69,236,0.4)] hover:border-white group-hover:ring-2 group-hover:ring-[#190e2e]">
                                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden shadow-md border border-[#8245ec] animate-fadein">
                                                            <img
                                                                src={experience.experienceBanner?.url || experience.img}
                                                                alt={experience.company}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-between">
                                                            <h3 className="text-xl font-extrabold text-white mb-1 drop-shadow-lg">{experience.role}</h3>
                                                            <h4 className="text-base text-[#aa96be] font-bold mb-1">{experience.company}</h4>
                                                            <p className="text-xs text-gray-400 mt-1 italic">{experience.date}</p>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 text-gray-200 text-base leading-relaxed animate-fadein">{experience.desc}</p>
                                                    <div className="mt-3">
                                                        <h5 className="font-bold text-white mb-2">Skills:</h5>
                                                        <ul className="flex flex-wrap gap-2">
                                                            {(Array.isArray(experience.skills) ? experience.skills : (experience.skills || "").split(",")).map((skill, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="font-semibold capitalize bg-gradient-to-r from-[#8245ec] to-[#fff] text-[#1a1333] px-3 py-1 text-xs md:text-xs rounded-lg border border-[#8245ec] shadow-md hover:scale-110 hover:bg-[#fff] hover:text-[#8245ec] transition-all duration-200 cursor-pointer"
                                                                >
                                                                    {skill}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-1/2"></div>
                                        )}
                                    </div>
                                    {/* Mobile layout: card below dot */}
                                    <div className="w-full flex md:hidden flex-col items-center mt-4">
                                        <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#8245ec] to-[#fff] border-4 border-[#9c82cb] rounded-full flex items-center justify-center shadow-[0_0_20px_5px_rgba(130,69,236,0.7)] z-20 mx-auto mb-4">
                                            <img
                                                src={experience.experienceBanner?.url || experience.img}
                                                alt={experience.company}
                                                className="w-8 h-8 object-cover rounded-full"
                                            />
                                        </span>
                                        <div className="w-full bg-gradient-to-br from-[#20133e] via-[#0a011f] to-[#020817] bg-opacity-80 backdrop-blur-2xl rounded-2xl shadow-xl border border-[#46247f] p-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_8px_rgba(130,69,236,0.4)] hover:border-white group-hover:ring-2 group-hover:ring-[#190e2e]">
                                            <div className="flex flex-row items-center gap-3">
                                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden shadow-md border border-[#8245ec] animate-fadein">
                                                    <img
                                                        src={experience.experienceBanner?.url || experience.img}
                                                        alt={experience.company}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-between">
                                                    <h3 className="text-xl font-extrabold text-white mb-1 drop-shadow-lg">{experience.role}</h3>
                                                    <h4 className="text-base text-[#aa96be] font-bold mb-1">{experience.company}</h4>
                                                    <p className="text-xs text-gray-400 mt-1 italic">{experience.date}</p>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-gray-200 text-base leading-relaxed animate-fadein">{experience.desc}</p>
                                            <div className="mt-3">
                                                <h5 className="font-bold text-white mb-2">Skills:</h5>
                                                <ul className="flex flex-wrap gap-2">
                                                    {(Array.isArray(experience.skills) ? experience.skills : (experience.skills || "").split(",")).map((skill, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="font-semibold capitalize bg-gradient-to-r from-[#8245ec] to-[#fff] text-[#1a1333] px-3 py-1 text-xs rounded-lg border border-[#8245ec] shadow-md hover:scale-110 hover:bg-[#fff] hover:text-[#8245ec] transition-all duration-200 cursor-pointer"
                                                        >
                                                            {skill}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center text-white text-lg">No experience added yet.</div>
                )}
            </div>
            {/* Custom keyframes for effects */}
            <style>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 4s ease-in-out infinite;
                }
                @keyframes fadein {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadein {
                    animation: fadein 1s ease;
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 30px 10px rgba(130,69,236,0.5); }
                    50% { box-shadow: 0 0 50px 20px rgba(130,69,236,0.8); }
                }
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Experience;
