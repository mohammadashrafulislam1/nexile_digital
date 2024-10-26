import axios from "axios";
import { useEffect, useState } from "react";
import { endPoint } from "../Components/ForAll/ForAll";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageWorks = () => {
    const [works, setWorks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWork = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${endPoint}/works`);
                console.log(response.data.works); // Log the response data
                setWorks(response.data.works); // Update the state with fetched works
                setLoading(false)
            } catch (error) {
                console.error("Error fetching works:", error); // Handle error
            }
        };

        fetchWork();
    }, [endPoint]);

    const handleEditWork = (work) => {
        // Handle edit work functionality
        console.log("Editing work:", work);
    navigate("/work", { state: { work } });
    };

    const handleDeleteWork = (work) => {
        // Handle delete work functionality
        console.log("Deleting work:", work);
    };

    // Filter works based on the search term
    const filteredWorks = works.filter((work) =>
        work?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        );
      }
    return (
        <div className="p-4">
            <h1 className="md:text-3xl text-xl font-semibold mb-4 text-center">Manage Works</h1>

            {/* Search Input */}
            <div className="flex justify-center items-center"><input
                type="text"
                placeholder="Search works..."
                className="mb-4 p-2 lg:w-1/3 md:w-1/2 w-3/4 border border-gray-300 rounded shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            /></div>

            <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center lg:grid-cols-4 gap-6 my-5">
                {filteredWorks?.map((work) => (
                    <div
                        key={work._id}
                        className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl"
                    >
                        <img className="w-full h-48 object-cover rounded-t-lg" src={work.images[0]?.url} alt={work.title} />
                        <div className="px-6 py-3">
                            <div className="font-bold text-xl mb-2 text-gray-800">{work.title}</div>
                            <p className="text-gray-600 mt-2"><strong>Category:</strong> {work.category}</p>
                            <p className="text-gray-600"><strong>Client:</strong> {work.client}</p>
                            <p className="text-gray-600"><strong>Completion Date:</strong> {new Date(work.completionDate).toLocaleDateString()}</p>
                           <p className="text-gray-600"><strong>Tags:</strong> {work.tags.join(", ")}</p>
                            </div>
                        <div className="px-6 pt-2 pb-5 flex justify-between">
                            <button className="text-2xl text-blue-600 hover:text-blue-800" onClick={() => handleEditWork(work)}>
                                <BsPencilSquare />
                            </button>
                            <button
                                type="button"
                                className="text-2xl text-red-600 hover:text-red-800"
                                onClick={() => handleDeleteWork(work)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageWorks;
