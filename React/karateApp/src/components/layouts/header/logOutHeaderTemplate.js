import React from "react";

//Route Components
import { NavLink } from "react-router-dom";

export const LogOutHeader = () => {
  return (
    <header>
      <div className="container">
        <div className="row general-aling">
          <div className="col s6 m6 l4">
            <NavLink to="/">
              {/**process.env.PUBLIC_URL */}
              <div className="imgcontainer">
                <img
                  src={`${
                    process.env.PUBLIC_URL
                  }/assets/img/resource/logo-dark.png`}
                  alt=""
                />
              </div>
            </NavLink>
          </div>
          <div className="col s6 m6 l8">
            <div className="social-links-block">
              <ul>
                <li>
                  <a href="/#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <i className="fab fa-youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
