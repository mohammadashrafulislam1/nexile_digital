import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "./ForAll";

const Header = () => {
    const [header, setHeader] = useState();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const response = await axios.get(`${endPoint}/hero`);
                console.log(response.data);
                setHeader(response.data);
            } catch (error) {
                console.error("Error fetching header data:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchHeader();
    }, []); // Added an empty dependency array to prevent infinite loop

    // Skeleton loader component
    const SkeletonLoader = () => (
        <div className="bg-gray-700 p-4">
            <div className="animate-pulse">
                <div className="h-12 bg-gray-600 rounded mb-2"></div>
                <div className="h-6 bg-gray-600 rounded mb-2"></div>
                <div className="h-6 bg-gray-600 rounded mb-2"></div>
                <div className="h-6 bg-gray-600 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-black">
            {loading ? (
                <SkeletonLoader /> // Show skeleton loader while loading
            ) : (
                <>
                    <img 
                        src={header[0]?.logo || ''} 
                        alt={`${header[0]?.title || ''} ${header[0]?.description || ''}`} 
                    />
                    <div>
                        {header[0]?.menu && header[0].menu.map(item => (
                            <li key={item._id}>
                                <a href={item?.link}>{item?.name}</a>
                            </li>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Header;
