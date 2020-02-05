import React, { Component } from "react";

//Bootstrap Components
import { NavDropdown } from "react-bootstrap";

//Route Components
import { NavLink, Route } from "react-router-dom";

class builderRoutesRules extends Component {
  /*
   *This method renders the routes of the "router-dom" component
   *@parameters
   *navthree: jsonObject, nest: represents the nesting level of the menu branch (default=0)
   *@output
   *mapped tree, with JSX structure
   */
  renderRoutes = (navthree, nest = 0) => {
    try {
      const obj = this;
      const three = navthree.map((el, i) => {
        if (!el.custom) {
          if (typeof el.link === "object") {
            return obj.renderRoutes(el.link, nest + 1);
          } else {
            return (
              <Route
                exact
                path={el.param ? el.param : el.link}
                component={el.component}
                key={"routes" + i + nest}
              />
            );
          }
        }
      });

      return three;
    } catch (e) {
      console.log(e);
    }
  };

  /*
   *This method renders the navigation tree of the header menu
   *@parameters
   *navthree: jsonObject, nest: represents the nesting level of the menu branch (default=0)
   *@output
   *mapped tree, with JSX structure
   */
  renderNavs = (navthree, nest = 0) => {
    try {
      const obj = this;
      const three = navthree.map((el, i) => {
        if (!el.custom) {
          if (typeof el.link === "object") {
            return (
              <NavDropdown
                className={nest > 0 ? "nestdropdown" : ""}
                drop={el.drop || "down"}
                title={el.element}
                id={"dropdown-" + el.element.toLowerCase() + i}
                key={"dropdown-" + el.element.toLowerCase() + i}
              >
                {obj.renderNavs(el.link, nest + 1)}
              </NavDropdown>
            );
          } else {
            if (el.element) {
              return (
                <NavLink
                  to={el.link}
                  key={el.element.toLowerCase() + i + nest}
                  className={nest === 0 ? "nav-link" : "dropdown-item"}
                >
                  {el.element}
                </NavLink>
              );
            } else {
              return false;
            }
          }
        } else {
          return el.custom();
        }
      });

      return three;
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { navthree } = this.props.navs;

    return this.renderRoutes(navthree);
  }
}

export default builderRoutesRules;
