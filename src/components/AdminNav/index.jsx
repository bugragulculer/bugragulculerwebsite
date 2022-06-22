import React from "react";
import { Link } from "react-router-dom";

const index = ({ location }) => {
  return (
    <nav className="admin__nav">
      <Link
        to="/admin"
        className={location === "/admin" ? "active" : undefined}
      >
        dashboard
      </Link>
      <Link
        to="/admin/blog_posts"
        className={location.includes("blog") ? "active" : undefined}
      >
        blog posts
      </Link>
      <Link
        to="/admin/tags"
        className={location.includes("tags") ? "active" : undefined}
      >
        tags
      </Link>
    </nav>
  );
};

export default index;
