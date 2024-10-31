import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { endPoint } from '../Components/ForAll/ForAll';
import { TagsInput } from 'react-tag-input-component';
import Swal from 'sweetalert2';

const AddBlog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const blogToEdit = location.state?.blog || null;
    console.log(blogToEdit)

    const [title, setTitle] = useState(blogToEdit?.title || '');
    const [category, setCategory] = useState(blogToEdit?.category || '');
    const [description, setDescription] = useState(blogToEdit?.description || '');
    const [metaTitle, setMetaTitle] = useState(blogToEdit?.metaTitle || '');
    const [metaDescription, setMetaDescription] = useState(blogToEdit?.metaDescription || '');
    const [tags, setTags] = useState(blogToEdit?.tags || []); // Initialize as an array for `TagsInput`
    const [image, setImage] =useState(blogToEdit?.image ||null);

    // Handle image file change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('metaTitle', metaTitle);
        formData.append('metaDescription', metaDescription);
        formData.append('tags', JSON.stringify(tags)); // Convert tags array to JSON
        if (image) formData.append('image', image);

          // Log formData entries
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    
        try {
            if (blogToEdit) {
                await axios.put(`${endPoint}/blog/${blogToEdit._id}`, formData);
                toast.success('Blog post updated successfully!');
            } else {
                await axios.post(`${endPoint}/blog`, formData);
                toast.success('Blog post created successfully!');
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${blogToEdit? "Blog updated successfully!" :"Blog added successfully!" }`,
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/blogs');
        } catch (error) {
            console.error('Error submitting form', error);
            toast.error('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="breadcrumbs text-sm lg:w-1/2 md:w-[80%] w-[96%] mx-auto">
                <ul className="my-6">
                    <li>
                        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                ></path>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <span className="inline-flex items-center gap-2 text-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                ></path>
                            </svg>
                            Services
                        </span>
                    </li>
                </ul>
                <ToastContainer />
            </div>
            
            <Link to="/blogs"><button className="btn btn-sm mb-2 flex justify-center items-center mx-auto bg-black text-white">Blogs</button></Link>
            <form
                onSubmit={handleSubmit}
                className="lg:w-1/2 md:w-[80%] w-[96%] mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    {blogToEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Meta Title</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Meta Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        classNames="p-4"
                        placeHolder="Add tags..."
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Upload Image</span>
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        onChange={handleImageChange}
                    />
                   {
                    image &&  <img src={image} alt={title}  className='w-32 h-32 my-4 object-cover rounded-xl'/>
                   }
                </div>

                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-black text-white w-full">
                        {blogToEdit ? 'Update Blog Post' : 'Create Blog Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
