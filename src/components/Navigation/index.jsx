import React, { useState } from "react";
import { Link, useNavigate, Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import i18next from "../../i18n/i18n";
import { useOuterClick } from "../../hooks";
import { changeTheme } from "../../state/actions/themeActions";
import { changeLang } from "../../state/actions/langActions";
import { signOut } from "../../state/actions/authActions";
import { LottieIcon } from "../";
import {
  MenuDark,
  MenuLight,
  AccountDark,
  AccountLight,
  Sun,
  Moon,
  SigninDark,
  SigninLight,
  SignoutDark,
  SignoutLight,
  LangDark,
  LangLight,
  LogoDark,
  LogoWhite,
  twitter,
  instagram,
  linkedin,
  twitterWhite,
  instagramWhite,
  linkedinWhite,
} from "../../assets";

const Navigation = () => {
  const profile = useSelector((state) => state.profile);
  const lang = useSelector((state) => state.lang);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountMenu, setAccountMenu] = useState(false);
  const [menu, setMenu] = useState(false);

  const accountRef = useOuterClick(() => setAccountMenu(false));
  const menuRef = useOuterClick(() => setMenu(false));

  const handleLanguage = (lang) => {
    i18next.changeLanguage(lang, (err, t) => {
      if (err) return console.log("something went wrong loading", err);
      t("key"); // -> same as i18next.t
    });
    dispatch(changeLang(lang));
  };

  return (
    <div className={`app app--${theme}`}>
      <nav className="navigation">
        <NavLink className="main__logo" to="/">
          {theme === "dark" ? (
            <img src={LogoWhite} alt="" />
          ) : (
            <img src={LogoDark} alt="" />
          )}
        </NavLink>
        <div className="menu__items">
          <NavLink to="/blog">{i18next.t("navbar.blog")}</NavLink>
          <NavLink to="/discord">{i18next.t("navbar.discord")}</NavLink>
          <NavLink to="/about">{i18next.t("navbar.about")}</NavLink>
        </div>
        <div className="navigation__buttons">
          <div className="nav__mobile__menu" ref={menuRef}>
            <button onClick={() => setMenu(!menu)} className="button--menu">
              {theme === "dark" ? (
                <LottieIcon icon={MenuLight} size={32} />
              ) : (
                <LottieIcon icon={MenuDark} size={32} />
              )}
            </button>
            {menu && (
              <div className="mobile__menu">
                <Link to="/blog">{i18next.t("navbar.blog")}</Link>
                <Link to="/discord">{i18next.t("navbar.discord")}</Link>
                <Link to="/about">{i18next.t("navbar.about")}</Link>
              </div>
            )}
          </div>

          <div className="account__wrapper" ref={accountRef}>
            <button onClick={() => setAccountMenu(!accountMenu)}>
              {theme === "dark" ? (
                <LottieIcon icon={AccountLight} size={32} />
              ) : (
                <LottieIcon icon={AccountDark} size={32} />
              )}
            </button>
            {accountMenu && (
              <div className="account__container">
                <button
                  onClick={() =>
                    dispatch(changeTheme(theme === "dark" ? "light" : "dark"))
                  }
                >
                  {theme === "dark" ? (
                    <>
                      <LottieIcon icon={Sun} size={32} />
                      {i18next.t("navbar.light")}
                    </>
                  ) : (
                    <>
                      <LottieIcon icon={Moon} size={32} />
                      {i18next.t("navbar.dark")}
                    </>
                  )}
                </button>
                <button
                  onClick={() =>
                    lang === "tr" ? handleLanguage("en") : handleLanguage("tr")
                  }
                >
                  {theme === "dark" ? (
                    <LottieIcon icon={LangLight} size={32} />
                  ) : (
                    <LottieIcon icon={LangDark} size={32} />
                  )}
                  {lang === "en" ? <strong>en</strong> : <p>en</p>}
                  <p>/</p>
                  {lang === "tr" ? <strong>tr</strong> : <p>tr</p>}
                </button>
                {/*<div className="divider" />
                {profile.role ? (
                  <>
                    <Link to="/account" replace>
                      <button>
                        {theme === "dark" ? (
                          <LottieIcon icon={AccountLight} size={32} />
                        ) : (
                          <LottieIcon icon={AccountDark} size={32} />
                        )}
                        {i18next.t("navbar.account")}
                      </button>
                    </Link>
                    <button onClick={() => dispatch(signOut())}>
                      {theme === "dark" ? (
                        <LottieIcon icon={SignoutLight} size={32} />
                      ) : (
                        <LottieIcon icon={SignoutDark} size={32} />
                      )}
                      {i18next.t("navbar.signout")}
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/signin")}>
                      {theme === "dark" ? (
                        <LottieIcon icon={SigninLight} size={32} />
                      ) : (
                        <LottieIcon icon={SigninDark} size={32} />
                      )}
                      {i18next.t("navbar.signin")}
                    </button>
                  </>
                )}*/}
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="app__body">
        <Outlet />
      </main>
      <footer className="footer">
        <div>
          <Link className="main__logo" to="/">
            {theme === "dark" ? (
              <img src={LogoWhite} alt="" />
            ) : (
              <img src={LogoDark} alt="" />
            )}
          </Link>
        </div>
        <div>
          <h4>{i18next.t("footer.contact")}</h4>
          <a href="https://twitter.com/BugraGulculer" className="link__img">
            {theme === "dark" ? (
              <img src={twitterWhite} alt="" />
            ) : (
              <img src={twitter} alt="" />
            )}
            twitter
          </a>
          <a
            href="https://www.instagram.com/bugragulculer/"
            className="link__img"
          >
            {theme === "dark" ? (
              <img src={instagramWhite} alt="" />
            ) : (
              <img src={instagram} alt="" />
            )}
            instagram
          </a>
          <a
            href="https://www.linkedin.com/in/bugrahangulculer/"
            className="link__img"
          >
            {theme === "dark" ? (
              <img src={linkedinWhite} alt="" />
            ) : (
              <img src={linkedin} alt="" />
            )}
            linkedin
          </a>
        </div>
        <div>
          <h4>{i18next.t("footer.pages")}</h4>
          <Link to="/">{i18next.t("footer.home")}</Link>
          <Link to="/blog">{i18next.t("footer.blog")}</Link>
          <Link to="/discord">{i18next.t("footer.discord")}</Link>
          <Link to="/about">{i18next.t("footer.about")}</Link>
        </div>
      </footer>
    </div>
  );
};

export default Navigation;
