import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AccountNav } from "../../components";

const AccountEdit = () => {
  const params = useLocation();
  const location = params.pathname;
  const state = useSelector((state) => state.profile);
  const initialProfile = useRef(state);

  return (
    <div className="account__container">
      <AccountNav location={location} />
      <div className="account__form">
        <div className="two__columns">
          <label>
            Fullname
            <input
              type="text"
              placeholder="Name Surname"
              value={state.fullname}
            />
          </label>
          <label>
            Member Since
            <input
              type="text"
              placeholder="Name Surname"
              value={state.dateJoined}
              disabled
            />
          </label>
        </div>
        <div className="two__columns">
          <label>
            Email
            <input type="email" placeholder="Email" value={state.email} />
          </label>
          <label>
            Phone
            <input
              type="number"
              placeholder="+90 505 505 50 50"
              value={state.phone}
            />
          </label>
        </div>
        <div className="address__form">
          <label>
            Address Name
            <input
              type="text"
              placeholder="House, Office, etc."
              value={state.address.name}
            />
          </label>
          <label>
            Address Line 1
            <input
              type="text"
              placeholder="1234 Main Street"
              value={state.address.line1}
            />
          </label>
          <label>
            Address Line 2
            <input
              type="text"
              placeholder="Apartment or Suite"
              value={state.address.line2}
            />
          </label>
          <div className="two__columns">
            <label>
              City
              <input
                type="text"
                placeholder="City"
                value={state.address.city}
              />
            </label>
            <label>
              Province/State
              <input
                type="text"
                placeholder="Province/State"
                value={state.address.state}
              />
            </label>
          </div>
          <div className="two__columns">
            <label>
              Country
              <input
                type="text"
                placeholder="Country"
                value={state.address.coutry}
              />
            </label>
            <label>
              Zip/Postal Code
              <input
                type="text"
                placeholder="Postal Code"
                value={state.address.postal}
              />
            </label>
          </div>
        </div>
        <div className="button__group">
          <button
            className="button--primary button--large"
            disabled={state === initialProfile.current}
          >
            save changes
          </button>
          <button
            className="button--warning button--large"
            disabled={state === initialProfile.current}
          >
            discard
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountEdit;
