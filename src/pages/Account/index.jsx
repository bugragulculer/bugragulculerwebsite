import { AccountNav } from "../../components";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import i18next from "../../i18n/i18n";
import { LottieIcon } from "../../components";
import { signOut } from "../../state/actions/authActions";
import { SignoutDark, SignoutLight } from "../../assets";

const Account = () => {
  const dispatch = useDispatch();
  const params = useLocation();
  const location = params.pathname;
  const theme = useSelector((state) => state.theme);
  const profile = useSelector((state) => state.profile);

  const [modal, setModal] = useState(false);
  return (
    <div className="account__container">
      <AccountNav location={location} />
      <div className="account__cubes">
        <div className="single__cube">
          <h2>Name</h2>
          <p>{profile.fullname}</p>
        </div>
        <div className="single__cube">
          <h2>Email</h2>
          <p>{profile.email}</p>
        </div>
        <div className="single__cube">
          <h2>Member Since</h2>
          <p>{profile.dateJoined}</p>
        </div>
        <div className="single__cube">
          <h2>Blog Favorites</h2>
          <p>{profile.blogFavorites.length}</p>
        </div>
        <div className="single__cube">
          <h2>Signout</h2>
          <button
            onClick={() => setModal(true)}
            className="button--warning button--medium"
          >
            <LottieIcon icon={SignoutLight} size={32} />
            {i18next.t("navbar.signout")}
          </button>
        </div>
      </div>
      {modal && (
        <div>
          <h2>Are you sure to sign out?</h2>
          <button onClick={() => dispatch(signOut())}>sign out</button>
          <button onClick={() => setModal(false)}>cancel</button>
        </div>
      )}
    </div>
  );
};

export default Account;
