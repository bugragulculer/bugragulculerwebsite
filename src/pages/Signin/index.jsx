import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signInWithGoogle, signIn } from "../../state/actions/authActions";
import {
  setAuthenticating,
  setAuthStatus,
} from "../../state/actions/miscActions";
import { FORGOT_PASSWORD, SIGNUP } from "../../constants/routes";

const Signin = () => {
  const theme = useSelector((state) => state.theme);
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const { authStatus, isAuthenticating } = useSelector((state) => ({
    authStatus: state.app.authStatus,
    isAuthenticating: state.app.isAuthenticating,
  }));

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onSignUp = () => navigate(SIGNUP);

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(signIn(form.email, form.password));
    //dispatch(setAuthStatus(null));
    //dispatch(setAuthenticating(false));
  };

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  useEffect(() => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  }, []);

  const onSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <div className="auth">
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast--success auth--success">
            {authStatus.message}
            {/* <LoadingOutlined /> */}
          </h3>
        </div>
      )}
      {!authStatus?.success && (
        <div className="auth__content">
          {authStatus?.message && (
            <h5 className="text--center toast--error">{authStatus?.message}</h5>
          )}
          <div
            className={`auth ${
              authStatus?.message && !authStatus?.success && "input--error"
            }`}
          >
            <div className="auth__main">
              <h3>Sign in to Buğra Gülcüler</h3>
              <div className="auth__wrapper">
                <form onSubmit={(e) => onSubmitForm(e)}>
                  <div className="auth__field">
                    <p>email</p>
                    <input
                      disabled={isAuthenticating}
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="test@example.com"
                      className={`input--text input--${theme} input--normal`}
                      onChange={(e) =>
                        setForm((form) => ({
                          ...form,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="auth__field">
                    <p>password</p>
                    <input
                      disabled={isAuthenticating}
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Your Password"
                      className={`input--text input--${theme} input--normal`}
                      onChange={(e) =>
                        setForm((form) => ({
                          ...form,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="auth__field auth__action">
                    <button
                      className={`button--primary button--primary--${theme} button--large`}
                      disabled={isAuthenticating}
                      type="submit"
                    >
                      {isAuthenticating ? "Signing In" : "Sign In"}
                      &nbsp;
                      {/* {isAuthenticating ? <LoadingOutlined /> : <ArrowRightOutlined />} */}
                    </button>
                    <Link
                      onClick={onClickLink}
                      to={FORGOT_PASSWORD}
                      className={`button--text button--text--${theme} button--large`}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="auth__divider">
              <h6>or</h6>
            </div>
            <div className="auth__provider">
              <div className="google-button" onClick={onSignInWithGoogle}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt=""
                  />
                </div>
                <p className="button-text">
                  <b>Sign in with Google</b>
                </p>
              </div>
            </div>
          </div>
          <div className="auth__message">
            <span className="auth__info">
              <strong>Don&apos;t have an account?</strong>
            </span>
            <button
              className={`button--outline button--large`}
              disabled={isAuthenticating}
              onClick={onSignUp}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
