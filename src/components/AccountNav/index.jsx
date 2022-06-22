import React from "react";
import { Link } from "react-router-dom";

const AccountNav = ({ location }) => {
  console.log(location)
  return (
    <div className="account__navigation">
      <Link
        to="/account"
        className={location === "/account" ? "active" : undefined}
      >
        dashboard
      </Link>
      <Link
        to="/account/edit"
        className={location === "/account/edit" ? "active" : undefined}
      >
        edit
      </Link>
      <Link
        to="/account/blog_favorites"
        className={
          location === "/account/blog_favorites" ? "active" : undefined
        }
      >
        blog favorites
      </Link>
    </div>
  );
};

export default AccountNav;
