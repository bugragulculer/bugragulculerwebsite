import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../../state/actions/authActions";
import { useDidMount } from "../../hooks";

const ForgotPassword = () => {
  const theme = useSelector((state) => state.theme);

  const { authStatus, isAuthenticating } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus,
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const [forgotPWStatus, setForgotPWStatus] = useState({});
  const [isSendingForgotPWRequest, setIsSending] = useState(false);
  const [email, setEmail] = useState();

  const onSubmitEmail = (e) => {
    e.preventDefault();
    if (email !== "") {
      console.log("here!");

      dispatch(resetPassword(email));
    }
  };

  useEffect(() => {
    if (didMount) {
      setForgotPWStatus(authStatus);
      setIsSending(isAuthenticating);
    }
  }, [authStatus, isAuthenticating, didMount]);

  return (
    <>
      <div className="forgot__password">
        {authStatus === null
          ? null
          : forgotPWStatus?.message && (
              <h5
                className={`text-center ${
                  authStatus?.success ? "toast-success" : "toast-error"
                }`}
              >
                {authStatus?.message}
              </h5>
            )}
        <h3>Forgot Your Password?</h3>
        <p>
          Enter your email address and we will send you a password reset email.
        </p>
        <form onSubmit={onSubmitEmail}>
          <input
            required
            maxLength={40}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            readOnly={isSendingForgotPWRequest || authStatus?.success}
            className={`input--text input--${theme} input--normal`}
          />
          <button
            type="submit"
            disabled={isSendingForgotPWRequest || authStatus?.success}
            className={`button--primary button--primary--${theme} button--large`}
          >
            {isSendingForgotPWRequest
              ? "Sending Password Reset Email"
              : "Send Password Reset Email"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
