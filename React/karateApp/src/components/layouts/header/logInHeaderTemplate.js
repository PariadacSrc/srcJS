import React from "react";

//Route Builder Components
import { NavLink } from "react-router-dom";

import LogOutButton from "../../auth/LogOutButton";

const notificationBell = () => {
  return (
    <li>
      <a href="#">
        <i className="fas fa-bell" />
      </a>
    </li>
  );
};

export const LogInHeader = props => {
  const { featuresbuttons, authUser } = props;
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col s12 m4 l3 pull-l1">
            <NavLink to="/">
              <div className="imgcontainer">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/img/resource/logo.png`}
                  alt=""
                />
              </div>
            </NavLink>
          </div>
          <div className="col s12 m8 l7">
            <div className="row">
              <div className="col col s8 m8 l8">
                <div className="searchform">
                  <form action="#">
                    <div className="row">
                      <div className="input-field col s12">
                        <div>
                          <input
                            id="user_name"
                            type="text"
                            className="validate"
                          />
                          <i className="fas fa-search" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col s4 m4 l4">
                <div className="social-links-block">
                  <ul>
                    {featuresbuttons()}
                    <li>
                      <span>{authUser}</span>
                    </li>
                    <li>
                      <LogOutButton />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
