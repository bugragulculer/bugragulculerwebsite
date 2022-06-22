import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "../components";
import { useSelector } from "react-redux";
import {
  Home,
  Signin,
  Signup,
  ForgotPassword,
  About,
  Content,
  Discord,
  Blog,
  BlogPost,
  Account,
  AccountInfo,
  AccountEdit,
  Admin,
  AdminBlog,
  AdminAddBlog,
  AdminEditBlog,
  AdminTags,
} from "../pages";
import { AdminRoute, ClientRoute, PublicRoute } from "./";
import { history } from "../";
import { routes } from "../constants";

const AppRouter = () => {
  const lang = useSelector((state) => state.lang);
  useEffect(() => {
    window.localStorage.setItem("language", lang);
  }, [lang]);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route element={<Home />} path={"/"} />
        <Route element={<Content />} path={routes.CONTENT} />
        <Route element={<Discord />} path={routes.DISCORD} />
        <Route element={<Blog />} path={routes.BLOG} />
        <Route element={<BlogPost />} path={routes.BLOG_DETAILS} />
        <Route element={<About />} path={routes.ABOUT} />
        {/*Public Routes*/}
        <Route path="/signin" element={<PublicRoute />}>
          <Route element={<Signin history={history} />} path={routes.SIGNIN} />
        </Route>
        <Route path="/signup" element={<PublicRoute />}>
          <Route element={<Signup history={history} />} path={routes.SIGNUP} />
        </Route>
        <Route path="/forgot_password" element={<PublicRoute />}>
          <Route element={<ForgotPassword />} path={routes.FORGOT_PASSWORD} />
        </Route>
        {/* Client Routes */}
        <Route path="/account" element={<ClientRoute />}>
          <Route element={<Account />} path={routes.ACCOUNT} />
          <Route element={<AccountInfo />} path={routes.ACCOUNT_INFO} />
          <Route element={<AccountEdit />} path={routes.ACCOUNT_EDIT} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<Admin />} path={routes.ADMIN} />
          <Route element={<AdminBlog />} path={routes.ADMIN_BLOG} />
          <Route element={<AdminAddBlog />} path={routes.ADMIN_ADD_BLOG} />
          <Route element={<AdminEditBlog />} path={routes.ADMIN_EDIT_BLOG} />
          <Route element={<AdminTags />} path={routes.ADMIN_TAGS} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
