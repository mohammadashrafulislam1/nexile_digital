import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-GB", options); // 'day month year' format
  };

  return (
    <div
      className="rounded-lg p-[2px] bg-gradient-to-r from-[#9DE8EE] via-[#FA7C0B] to-[#9F8CED] shadow-lg hover:shadow-xl transition duration-300"
    >
      {/* Inner Content Wrapper */}
      <div className="bg-[#121212] w-full rounded-lg p-3 grid md:grid-cols-2 grid-cols-1 items-center gap-5 ">
        {/* Blog Image */}
        <div className="col-span-1 flex justify-center">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="md:w-72 h-[200px] w-full md:h-72 object-cover rounded-lg"
          />
        </div>

        {/* Blog Content */}
        <div className="col-span-1 flex flex-col justify-start mt-4">
          {/* Blog Title */}
          <h1
            className="text-lg lg:text-[20px] font-semibold leading-tight text-white uppercase mb-2"
          >
            {blog?.title}
          </h1>

          {/* Blog Date */}
          <p className="text-sm text-gray-400 mb-2">{formatDate(blog.created_at)}</p>

          {/* Blog Category */}
          <p className="text-md text-[#00ECFB] font-semibold mb-2">
            {blog.category}
          </p>

          {/* Read More Button */}
        <Link to={`/blog/${blog.title.replace(/\s+/g, "-")}`}>
            <p className="text-white bg-[#131313] w-fit px-3 py-1 text-sm rounded-md hover:bg-[#1a1a1a] transition">
              Read more
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
