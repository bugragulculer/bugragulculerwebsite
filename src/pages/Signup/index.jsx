import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signInWithGoogle, signUp } from "../../state/actions/authActions";
import {
  setAuthenticating,
  setAuthStatus,
} from "../../state/actions/miscActions";
import { SIGNIN } from "../../constants/routes";

const Signup = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { isAuthenticating, authStatus } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus,
  }));

  const [form, setForm] = useState({ email: "", password: "", fullname: "" });

  const onClickSignIn = () => navigate(SIGNIN);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUp({
        fullname: form.fullname.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
      })
    );
  };

  useEffect(() => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  }, [dispatch]);

  const onSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <>
      <div className="auth">
        {authStatus?.success && (
          <div className="loader">
            <h3 className="toast-success auth-success">
              {authStatus?.message}
              {/* <LoadingOutlined /> */}
            </h3>
          </div>
        )}
        {!authStatus?.success && (
          <div className="auth__content">
            {authStatus?.message && (
              <h5 className="text-center toast-error">{authStatus?.message}</h5>
            )}
            <div
              className={`auth ${
                authStatus?.message && !authStatus?.success && "input-error"
              }`}
            >
              <div className="auth__main">
                <h3>Sign up to Buğra Gülcüler</h3>
                <form onSubmit={onFormSubmit}>
                  <div className="auth__field">
                    <p>name</p>
                    <input
                      disabled={isAuthenticating}
                      name="fullname"
                      type="text"
                      label="* Full Name"
                      placeholder="John Doe"
                      style={{ textTransform: "capitalize" }}
                      className={`input--text input--${theme} input--normal`}
                      onChange={(e) =>
                        setForm((form) => ({
                          ...form,
                          fullname: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="auth__field">
                    <p>email</p>
                    <input
                      disabled={isAuthenticating}
                      name="email"
                      type="email"
                      label="* Email"
                      placeholder="test@example.com"
                      className={`input--text input--${theme} input--normal`}
                      onChange={(e) =>
                        setForm((form) => ({ ...form, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="auth__field">
                    <p>password</p>
                    <input
                      disabled={isAuthenticating}
                      name="password"
                      type="password"
                      label="* Password"
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
                  <br />
                  <div className="auth__field auth__action auth_action__signup">
                    <button
                      className={`button--primary button--primary--${theme} button--large`}
                      disabled={isAuthenticating}
                      type="submit"
                    >
                      {isAuthenticating ? "Signing Up" : "Sign Up"}
                      &nbsp;
                      {/* {isAuthenticating ? <LoadingOutlined /> : <ArrowRightOutlined />} */}
                    </button>
                  </div>
                </form>
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
              <span className="auth-info">
                <strong>Already have an account?</strong>
              </span>
              <button
                className={`button--outline button--outline--${theme} button--large`}
                disabled={isAuthenticating}
                onClick={onClickSignIn}
                type="button"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
