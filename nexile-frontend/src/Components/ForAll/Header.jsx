import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "./ForAll";

const Header = () => {
    const [header, setHeader] = useState();
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const response = await axios.get(`${endPoint}/hero`);
                console.log(response.data);
                setHeader(response.data);
            } catch (error) {
                console.error("Error fetching header data:", error);
            } finally {
                setLoading(false); // Set to false after fetch attempt
            }
        };
        fetchHeader();
    }, []);

    // Skeleton loader component
    const SkeletonLoader = () => (
            <div className="animate-pulse flex gap-5 navbar justify-between">
                <div className="h-12 bg-gray-300 w-[300px] rounded"></div>
                <div className="flex gap-2 w-[40%] items-center justify-end lg:justify-center">
                <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
                <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
                <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
                <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
                <div className="h-6 bg-white w-full rounded lg:block hidden"></div>
                <div className="h-6 bg-white lg:w-full rounded w-10"></div>
                </div>
            </div>
    );

    return (
        <div className="navbar relative">
            {loading ? (
                <SkeletonLoader />
            ) : (
                <div className="navbar flex justify-between items-center">
                    <img 
                        src={header[0]?.logo || ''} 
                        alt={`${header[0]?.title || ''} ${header[0]?.description || ''}`} 
                        className="w-[250px] h-[52px]"
                    />
                    <div className="text-white flex-none menu menu-horizontal px-1 poppins-regular text-[18px] font-light hidden md:hidden lg:flex" 
                        style={{ textDecoration: 'none' }}>
                        {header[0]?.menu && header[0].menu.map(item => (
                            <li key={item._id}>
                                <a href={item?.link}>{item?.name}</a>
                            </li>
                        ))}
                    </div>
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsDropdownOpen(true)} 
                            className="btn btn-ghost text-white btn-circle"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dropdown overlay */}
                    {isDropdownOpen && (
                        <div className="fixed inset-0 lg:hidden bg-black bg-opacity-100 z-50 flex flex-col p-4 text-white">
                            <button 
                                onClick={() => setIsDropdownOpen(false)} 
                                className="text-2xl ml-auto mb-4"
                            >
                                ✖
                            </button>
                            <img 
                                src={header[0]?.logo || ''} 
                                alt={`${header[0]?.title || ''} ${header[0]?.description || ''}`} 
                                className="w-[250px] h-[50px] mb-10"
                            />
                            <ul className="text-center space-y-6 text-[18px] font-light poppins-regular">
                                {header[0]?.menu && header[0].menu.map(item => (
                                    <a href={item?.link} key={item._id}>
                                        <li className="mb-2 bg-white bg-opacity-60 text-black px-24 py-2 rounded-md">
                                            {item?.name}
                                        </li>
                                    </a>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
