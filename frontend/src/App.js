import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import "./App.css"

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (
      localStorage.getItem("isLoggedIn") !== null &&
      localStorage.getItem("isLoggedIn") !== "false"
    ) {
      dispatch(authActions.login());
      navigate("/blogs");
    }
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <main>
        <Routes>
          {/* {!isLoggedIn ? ( */}
          <>
            <Route path="/" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
          </>
          {/* ) : ( */}
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/myblogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
          </>
          {/* )} */}

          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                {" "}
                PAGE NOT FOUND{" "}
              </h1>
            }
          />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
