import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import Header from "./Header";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRquest = async () => {
    const res = await axios
      .get(`http://localhost:9000/api/blog`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRquest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      <Header />
      <div className="grid-container">

      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog?.image}
            userName={blog?.user?.name}
          />
        ))}
      </div>
     
    </div>
  );
};
export default Blogs;
